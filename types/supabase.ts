export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          slug: string
          plan: 'free' | 'pro'
          stripe_customer_id: string | null
          onboarding_completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          plan?: 'free' | 'pro'
          stripe_customer_id?: string | null
          onboarding_completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          plan?: 'free' | 'pro'
          stripe_customer_id?: string | null
          onboarding_completed?: boolean
          created_at?: string
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          role: 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          workspace_id: string
          user_id: string
          role?: 'admin' | 'member'
          joined_at?: string
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: 'admin' | 'member'
          joined_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          workspace_id: string
          name: string
          email: string | null
          phone: string | null
          company: string | null
          position: string | null
          status: 'novo' | 'em_contato' | 'proposta' | 'fechado_ganho' | 'fechado_perdido'
          assignee_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          position?: string | null
          status?: 'novo' | 'em_contato' | 'proposta' | 'fechado_ganho' | 'fechado_perdido'
          assignee_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          position?: string | null
          status?: 'novo' | 'em_contato' | 'proposta' | 'fechado_ganho' | 'fechado_perdido'
          assignee_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          workspace_id: string
          lead_id: string
          title: string
          value: number
          stage: 'novo_lead' | 'contato_realizado' | 'proposta_enviada' | 'negociacao' | 'fechado_ganho' | 'fechado_perdido'
          assignee_id: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          lead_id: string
          title: string
          value?: number
          stage?: 'novo_lead' | 'contato_realizado' | 'proposta_enviada' | 'negociacao' | 'fechado_ganho' | 'fechado_perdido'
          assignee_id?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          lead_id?: string
          title?: string
          value?: number
          stage?: 'novo_lead' | 'contato_realizado' | 'proposta_enviada' | 'negociacao' | 'fechado_ganho' | 'fechado_perdido'
          assignee_id?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          lead_id: string
          workspace_id: string
          author_id: string | null
          type: 'ligacao' | 'email' | 'reuniao' | 'nota'
          description: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          workspace_id: string
          author_id?: string | null
          type: 'ligacao' | 'email' | 'reuniao' | 'nota'
          description: string
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          workspace_id?: string
          author_id?: string | null
          type?: 'ligacao' | 'email' | 'reuniao' | 'nota'
          description?: string
          date?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          workspace_id: string
          stripe_subscription_id: string | null
          stripe_price_id: string | null
          status: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          stripe_subscription_id?: string | null
          stripe_price_id?: string | null
          status?: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          stripe_subscription_id?: string | null
          stripe_price_id?: string | null
          status?: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      is_workspace_member: {
        Args: { ws_id: string }
        Returns: boolean
      }
      is_workspace_admin: {
        Args: { ws_id: string }
        Returns: boolean
      }
    }
  }
}

// Helpers para uso com createClient<Database>
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
