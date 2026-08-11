# AEC Back Office — Supabase setup

Everything the admin area needs lives in five migrations. They are split one per
feature so you can apply them individually, but **order matters**: `0001` defines
`is_admin()` and `set_updated_at()`, which every later file depends on.

| # | File | Creates |
|---|------|---------|
| 1 | `migrations/0001_admin_core.sql` | `admin_users`, `is_admin()`, `set_updated_at()` |
| 2 | `migrations/0002_inquiries.sql` | `inquiries` |
| 3 | `migrations/0003_crm.sql` | `pipeline_stages`, `leads`, `lead_activities`, `promote_inquiry_to_lead()` |
| 4 | `migrations/0004_testimonials.sql` | `testimonials` + the `testimonials` storage bucket |
| 5 | `migrations/0005_blog.sql` | `blog_posts` + the `blog` storage bucket |
| 6 | `migrations/0006_make_admin_aec_lk_admin.sql` | Promotes `admin@aec.lk` to `admin_users` (`owner` role) automatically |


## 1. Apply the migrations

Supabase Dashboard → **SQL Editor** → paste each file in order and run it.
Each file is idempotent, so re-running one is safe.

If you use the Supabase CLI instead:

```bash
supabase db push
```

## 2. Wire up the environment

Copy `.env.example` to `.env.local` and fill it in from
**Project Settings → API**:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL` — the project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the anon/publishable key (browser-safe; RLS protects the data)
- `SUPABASE_SERVICE_ROLE_KEY` — the secret key. Server-side only. It bypasses RLS, so it is used **only** to write public form submissions and AI-agent inquiries
- `INQUIRIES_API_KEY` — a secret you invent, used by `POST /api/inquiries`

Restart `npm run dev` after editing `.env.local`.

## 3. Create your first admin

Being a Supabase Auth user is not enough — the account must also be on the
`admin_users` allowlist, which is what every RLS policy checks.

1. **Authentication → Users → Add user**. Set a password and tick
   *Auto Confirm User*.
2. Run this in the SQL Editor with that email:

```sql
insert into public.admin_users (id, email, full_name, role)
select id, email, 'Your Name', 'owner'
from auth.users
where email = 'you@example.com'
on conflict (id) do nothing;
```

Then sign in at `/admin/login`.

To revoke someone's access, delete their `admin_users` row — their login stops
working immediately and RLS rejects every query, even if they still hold a
session cookie.

## Notes on the schema

**The default pipeline stage is protected.** `pipeline_stages` has exactly one
row with `is_default = true` ("New Leads"). Database triggers refuse to rename or
delete it, because it is the guaranteed landing zone for inquiries promoted from
the Inquiries tab. Deleting any *other* stage moves its leads there rather than
deleting them.

**Inquiries record where they came from.** `source_type` distinguishes a website
form from the AI agent; `source_form` and `source_label` say *which* form. Add a
new website form by adding one entry to `FORM_SOURCES` in
`src/lib/inquiries.ts` — no migration needed.

**Storage buckets are public-read, admin-write.** Testimonial photos and blog
covers are served straight from Supabase storage; only allowlisted admins can
upload, replace or delete.

**Two columns are owned by triggers.** `blog_posts.published_at` is stamped the
first time a post is published, and `blog_posts.reading_minutes` is computed from
the body. The app does not set either.
