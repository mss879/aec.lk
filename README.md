# Australian Education Centre

Marketing site and back office for AEC, built with Next.js 16 (App Router),
Tailwind CSS v4 and Supabase.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000), the back office
at [http://localhost:3000/admin](http://localhost:3000/admin).

Before the admin area will work you need to apply the database migrations and
create your first admin account — see [`supabase/README.md`](supabase/README.md).

## What's here

### Public site

Marketing pages under `src/app/`, sharing a header, footer and the `PageHero`
component. Two of them are database-driven:

- `/testimonials` — client stories, managed from the back office
- `/blog` and `/blog/[slug]` — articles, managed from the back office

The consultation form on `/contact` writes into the Inquiries table, tagged with
which form it came from.

### Back office (`/admin`)

| Tab | Route | What it does |
|-----|-------|--------------|
| Dashboard | `/admin` | Preview of every other tab — recent inquiries, pipeline health, latest testimonials and posts |
| Inquiries | `/admin/inquiries` | Every form submission, tagged by source form or AI agent. Qualified ones get promoted into the CRM |
| CRM | `/admin/crm` | Drag-and-drop lead pipeline with custom stages |
| Testimonials | `/admin/testimonials` | Create, edit and publish testimonials, with an optional photo |
| Blog | `/admin/blog` | Write, edit and publish articles with a cover image |

Access is gated three ways: `src/proxy.ts` bounces signed-out visitors, the
admin layout checks the `admin_users` allowlist, and Postgres Row Level Security
enforces the same rule on every query — so a leaked session cookie still cannot
read anything.

## Where inquiries come from

Every submission records **how it arrived**:

- `source_type` — `form`, `ai_agent`, `manual` or `import`
- `source_form` / `source_label` — *which* form, e.g. `contact_consultation`
- `agent_name` — set when an AI agent created the inquiry

Adding a new website form means adding one entry to `FORM_SOURCES` in
`src/lib/inquiries.ts` and calling the shared submit action. No migration.

External systems — including the AI agent you plan to add — post to
`POST /api/inquiries` with an `x-api-key` header matching `INQUIRIES_API_KEY`.
The route file documents the request contract.

## Project layout

```
src/
  app/
    admin/
      login/            sign-in (outside the auth-gated route group)
      (dashboard)/      every authenticated admin page
    api/inquiries/      intake endpoint for external systems and the AI agent
    blog/               public blog
    testimonials/       public testimonials
    ...                 the rest of the marketing site
  components/
    admin/              back-office UI kit, sidebar, image upload
    layout/             header, footer, preloader
    ui/                 shared marketing components
  lib/
    supabase/           browser / server / service-role clients, auth helpers, types
    storage.ts          image upload + cleanup
  proxy.ts              auth gate (Next.js 16's replacement for middleware)
supabase/migrations/    one migration per feature
```

## A note on the Next.js version

This project is on Next.js 16, which differs from earlier App Router releases:
`params` and `searchParams` are Promises, `cookies()` is async, and `middleware`
has been renamed to `proxy`. The bundled documentation in
`node_modules/next/dist/docs/` is the reference to trust.
