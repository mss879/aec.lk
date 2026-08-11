/**
 * Types for the AEC back-office schema.
 *
 * Kept in sync by hand with `supabase/migrations/*.sql`. If you change a
 * migration, change the matching block here — every Supabase call in the app is
 * typed through it.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SourceType = "form" | "ai_agent" | "manual" | "import";

export type InquiryStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "unqualified"
  | "converted"
  | "archived";

export type LeadPriority = "low" | "medium" | "high";
export type LeadStatus = "open" | "won" | "lost";
export type BlogStatus = "draft" | "published";
export type ActivityType =
  | "note"
  | "call"
  | "email"
  | "meeting"
  | "stage_change"
  | "created";

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "owner";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "admin" | "owner";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "admin" | "owner";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      inquiries: {
        Row: {
          id: string;
          first_name: string;
          last_name: string | null;
          email: string;
          phone: string | null;
          interest: string | null;
          message: string | null;
          source_type: SourceType;
          source_form: string | null;
          source_label: string | null;
          source_page: string | null;
          agent_name: string | null;
          status: InquiryStatus;
          admin_notes: string | null;
          metadata: Json;
          converted_lead_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name?: string | null;
          email: string;
          phone?: string | null;
          interest?: string | null;
          message?: string | null;
          source_type?: SourceType;
          source_form?: string | null;
          source_label?: string | null;
          source_page?: string | null;
          agent_name?: string | null;
          status?: InquiryStatus;
          admin_notes?: string | null;
          metadata?: Json;
          converted_lead_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
        Relationships: [];
      };

      pipeline_stages: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string;
          position: number;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          color?: string;
          position?: number;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["pipeline_stages"]["Insert"]
        >;
        Relationships: [];
      };

      leads: {
        Row: {
          id: string;
          stage_id: string;
          inquiry_id: string | null;
          full_name: string;
          email: string | null;
          phone: string | null;
          interest: string | null;
          notes: string | null;
          value: number | null;
          currency: string;
          priority: LeadPriority;
          status: LeadStatus;
          source_type: SourceType;
          source_form: string | null;
          source_label: string | null;
          assigned_to: string | null;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          stage_id: string;
          inquiry_id?: string | null;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          interest?: string | null;
          notes?: string | null;
          value?: number | null;
          currency?: string;
          priority?: LeadPriority;
          status?: LeadStatus;
          source_type?: SourceType;
          source_form?: string | null;
          source_label?: string | null;
          assigned_to?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };

      lead_activities: {
        Row: {
          id: string;
          lead_id: string;
          type: ActivityType;
          body: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          type?: ActivityType;
          body?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["lead_activities"]["Insert"]
        >;
        Relationships: [];
      };

      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          institution: string | null;
          location: string | null;
          quote: string;
          rating: number;
          image_url: string | null;
          image_path: string | null;
          is_published: boolean;
          is_featured: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          institution?: string | null;
          location?: string | null;
          quote: string;
          rating?: number;
          image_url?: string | null;
          image_path?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };

      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          cover_image_path: string | null;
          author_name: string | null;
          category: string | null;
          tags: string[];
          status: BlogStatus;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          reading_minutes: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          cover_image_path?: string | null;
          author_name?: string | null;
          category?: string | null;
          tags?: string[];
          status?: BlogStatus;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          reading_minutes?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
        Relationships: [];
      };
    };

    Views: Record<never, never>;

    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      promote_inquiry_to_lead: {
        Args: { p_inquiry_id: string };
        Returns: string;
      };
    };

    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

// --- Convenience row aliases used across the app --------------------------

type PublicTables = Database["public"]["Tables"];

export type AdminUser = PublicTables["admin_users"]["Row"];
export type Inquiry = PublicTables["inquiries"]["Row"];
export type PipelineStage = PublicTables["pipeline_stages"]["Row"];
export type Lead = PublicTables["leads"]["Row"];
export type LeadActivity = PublicTables["lead_activities"]["Row"];
export type Testimonial = PublicTables["testimonials"]["Row"];
export type BlogPost = PublicTables["blog_posts"]["Row"];
