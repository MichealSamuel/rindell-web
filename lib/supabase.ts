import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          plan: 'free' | 'student' | 'pro' | 'business'
          created_at: string
          updated_at: string
        }
      }
      whatsapp_sessions: {
        Row: {
          id: string
          user_id: string
          status: 'connecting' | 'connected' | 'disconnected' | 'error'
          phone_number: string | null
          connected_at: string | null
          last_active_at: string | null
          created_at: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_type: string
          file_size_bytes: number | null
          source: 'whatsapp' | 'web' | 'unknown' | 'api'
          created_at: string
        }
      }
      analyses: {
        Row: {
          id: string
          document_id: string
          user_id: string
          analysis_type: string
          summary: string | null
          tokens_used: number
          processing_time_ms: number
          status: 'processing' | 'completed' | 'failed'
          created_at: string
        }
      }
      usage_monthly: {
        Row: {
          id: string
          user_id: string
          month: string
          documents_processed: number
          tokens_used: number
        }
      }
    }
  }
}
