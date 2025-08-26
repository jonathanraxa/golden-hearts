import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for better TypeScript support
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          location: string
          date_of_birth: string | null
          availability: string
          experience: string
          interests: string[]
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          location: string
          date_of_birth?: string | null
          availability: string
          experience: string
          interests: string[]
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          location?: string
          date_of_birth?: string | null
          availability?: string
          experience?: string
          interests?: string[]
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string
          mission: string
          category: string
          location: string
          website: string | null
          logo_url: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          mission: string
          category: string
          location: string
          website?: string | null
          logo_url?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          mission?: string
          category?: string
          location?: string
          website?: string | null
          logo_url?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string
          category: string
          location: string
          duration: string
          start_date: string
          end_date: string
          requirements: string[]
          benefits: string[]
          skills: string[]
          max_volunteers: number
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          long_description: string
          category: string
          location: string
          duration: string
          start_date: string
          end_date: string
          requirements: string[]
          benefits: string[]
          skills: string[]
          max_volunteers: number
          organization_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          long_description?: string
          category?: string
          location?: string
          duration?: string
          start_date?: string
          end_date?: string
          requirements?: string[]
          benefits?: string[]
          skills?: string[]
          max_volunteers?: number
          organization_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
