export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      artesanatos: {
        Row: {
          artesao_contato: string | null
          artesao_instagram: string | null
          artesao_nome: string
          artesao_whatsapp: string | null
          categoria: string
          created_at: string
          descricao: string | null
          destaque: boolean
          disponivel: boolean
          id: string
          imagens: string[] | null
          nome: string
          preco: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          artesao_contato?: string | null
          artesao_instagram?: string | null
          artesao_nome: string
          artesao_whatsapp?: string | null
          categoria: string
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          disponivel?: boolean
          id?: string
          imagens?: string[] | null
          nome: string
          preco?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          artesao_contato?: string | null
          artesao_instagram?: string | null
          artesao_nome?: string
          artesao_whatsapp?: string | null
          categoria?: string
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          disponivel?: boolean
          id?: string
          imagens?: string[] | null
          nome?: string
          preco?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          source: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          source?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          source?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          start_date: string
          theme: string | null
          title: string
          uf: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          start_date: string
          theme?: string | null
          title: string
          uf?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          start_date?: string
          theme?: string | null
          title?: string
          uf?: string | null
          url?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt: string | null
          created_at: string | null
          height: number | null
          id: string
          mime_type: string | null
          size_bytes: number | null
          url: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          created_at?: string | null
          height?: number | null
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          url: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          created_at?: string | null
          height?: number | null
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      newsletters: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          amp_html: string | null
          author_id: string | null
          body_mdx: string | null
          category_id: string | null
          cover_alt: string | null
          cover_url: string | null
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          og_image_url: string | null
          published_at: string | null
          reading_time: number | null
          scheduled_at: string | null
          slug: string
          source: string
          status: Database["public"]["Enums"]["post_status"] | null
          subtitle: string | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          amp_html?: string | null
          author_id?: string | null
          body_mdx?: string | null
          category_id?: string | null
          cover_alt?: string | null
          cover_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          og_image_url?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug: string
          source?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          subtitle?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          amp_html?: string | null
          author_id?: string | null
          body_mdx?: string | null
          category_id?: string | null
          cover_alt?: string | null
          cover_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          og_image_url?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug?: string
          source?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          subtitle?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      property_reviews: {
        Row: {
          bathrooms_rating: number
          communication_rating: number
          created_at: string
          id: string
          improvement_suggestions: string | null
          infrastructure_rating: number
          overall_rating: number
          positive_aspects: string | null
          property_location: string
          property_name: string
          review_text: string | null
          reviewer_disability_type: string | null
          reviewer_name: string
          service_rating: number
          trails_rating: number
          updated_at: string
          visit_date: string | null
          would_recommend: boolean
        }
        Insert: {
          bathrooms_rating: number
          communication_rating: number
          created_at?: string
          id?: string
          improvement_suggestions?: string | null
          infrastructure_rating: number
          overall_rating: number
          positive_aspects?: string | null
          property_location: string
          property_name: string
          review_text?: string | null
          reviewer_disability_type?: string | null
          reviewer_name: string
          service_rating: number
          trails_rating: number
          updated_at?: string
          visit_date?: string | null
          would_recommend?: boolean
        }
        Update: {
          bathrooms_rating?: number
          communication_rating?: number
          created_at?: string
          id?: string
          improvement_suggestions?: string | null
          infrastructure_rating?: number
          overall_rating?: number
          positive_aspects?: string | null
          property_location?: string
          property_name?: string
          review_text?: string | null
          reviewer_disability_type?: string | null
          reviewer_name?: string
          service_rating?: number
          trails_rating?: number
          updated_at?: string
          visit_date?: string | null
          would_recommend?: boolean
        }
        Relationships: []
      }
      propriedades: {
        Row: {
          atividades: string[] | null
          ativo: boolean
          capacidade_visitantes: number | null
          cep: string | null
          cidade: string
          created_at: string
          descricao: string | null
          destaque: boolean
          email: string | null
          endereco: string
          estado: string
          horario_funcionamento: string | null
          id: string
          imagens: string[] | null
          infraestrutura: string[] | null
          latitude: number | null
          longitude: number | null
          nome: string
          preco_visita: number | null
          tamanho_hectares: number | null
          telefone: string | null
          tipo_propriedade: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          atividades?: string[] | null
          ativo?: boolean
          capacidade_visitantes?: number | null
          cep?: string | null
          cidade: string
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          email?: string | null
          endereco: string
          estado?: string
          horario_funcionamento?: string | null
          id?: string
          imagens?: string[] | null
          infraestrutura?: string[] | null
          latitude?: number | null
          longitude?: number | null
          nome: string
          preco_visita?: number | null
          tamanho_hectares?: number | null
          telefone?: string | null
          tipo_propriedade: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          atividades?: string[] | null
          ativo?: boolean
          capacidade_visitantes?: number | null
          cep?: string | null
          cidade?: string
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          email?: string | null
          endereco?: string
          estado?: string
          horario_funcionamento?: string | null
          id?: string
          imagens?: string[] | null
          infraestrutura?: string[] | null
          latitude?: number | null
          longitude?: number | null
          nome?: string
          preco_visita?: number | null
          tamanho_hectares?: number | null
          telefone?: string | null
          tipo_propriedade?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      site_analytics: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          created_at: string
          date: string
          id: string
          page_views: number
          unique_visitors: number
          updated_at: string
          visits: number
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string
          date: string
          id?: string
          page_views?: number
          unique_visitors?: number
          updated_at?: string
          visits?: number
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string
          date?: string
          id?: string
          page_views?: number
          unique_visitors?: number
          updated_at?: string
          visits?: number
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
          source: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
          source?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          source?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          error_msg: string | null
          id: string
          payload: Json | null
          scheduled_at: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_msg?: string | null
          id?: string
          payload?: Json | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_msg?: string | null
          id?: string
          payload?: Json | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      uploaded_pdfs: {
        Row: {
          created_at: string
          extracted_text: string
          file_size: number | null
          filename: string
          id: string
          is_active: boolean | null
          qr_code_id: string
          updated_at: string
          upload_date: string
        }
        Insert: {
          created_at?: string
          extracted_text: string
          file_size?: number | null
          filename: string
          id?: string
          is_active?: boolean | null
          qr_code_id?: string
          updated_at?: string
          upload_date?: string
        }
        Update: {
          created_at?: string
          extracted_text?: string
          file_size?: number | null
          filename?: string
          id?: string
          is_active?: boolean | null
          qr_code_id?: string
          updated_at?: string
          upload_date?: string
        }
        Relationships: []
      }
      vouchers: {
        Row: {
          beneficiario_email: string | null
          beneficiario_nome: string | null
          codigo: string
          comprador_email: string
          comprador_nome: string
          created_at: string
          data_compra: string
          data_expiracao: string
          data_uso: string | null
          id: string
          observacoes: string | null
          propriedade_id: string
          qr_code_data: string | null
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
          usado_por: string | null
          valor: number
        }
        Insert: {
          beneficiario_email?: string | null
          beneficiario_nome?: string | null
          codigo: string
          comprador_email: string
          comprador_nome: string
          created_at?: string
          data_compra?: string
          data_expiracao?: string
          data_uso?: string | null
          id?: string
          observacoes?: string | null
          propriedade_id: string
          qr_code_data?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          usado_por?: string | null
          valor: number
        }
        Update: {
          beneficiario_email?: string | null
          beneficiario_nome?: string | null
          codigo?: string
          comprador_email?: string
          comprador_nome?: string
          created_at?: string
          data_compra?: string
          data_expiracao?: string
          data_uso?: string | null
          id?: string
          observacoes?: string | null
          propriedade_id?: string
          qr_code_data?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          usado_por?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_propriedade_id_fkey"
            columns: ["propriedade_id"]
            isOneToOne: false
            referencedRelation: "propriedades"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_voucher_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_artesanatos_public_view: {
        Args: Record<PropertyKey, never>
        Returns: {
          artesao_contato: string
          artesao_instagram: string
          artesao_nome: string
          artesao_whatsapp: string
          categoria: string
          created_at: string
          descricao: string
          destaque: boolean
          id: string
          imagens: string[]
          nome: string
        }[]
      }
      get_property_contact_info: {
        Args: { property_id: string }
        Returns: {
          email: string
          telefone: string
          website: string
        }[]
      }
      get_property_public_view: {
        Args: Record<PropertyKey, never>
        Returns: {
          atividades: string[]
          capacidade_visitantes: number
          cidade: string
          created_at: string
          descricao: string
          destaque: boolean
          endereco: string
          estado: string
          has_contact: boolean
          horario_funcionamento: string
          id: string
          imagens: string[]
          infraestrutura: string[]
          latitude: number
          longitude: number
          nome: string
          preco_visita: number
          tamanho_hectares: number
          tipo_propriedade: string
        }[]
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      use_voucher: {
        Args: { used_by_name: string; voucher_code: string }
        Returns: boolean
      }
      validate_voucher: {
        Args: { voucher_code: string }
        Returns: {
          beneficiario_nome: string
          data_expiracao: string
          propriedade_nome: string
          status: string
          valid: boolean
          valor: number
          voucher_id: string
        }[]
      }
    }
    Enums: {
      post_status: "draft" | "review" | "scheduled" | "published"
      task_status:
        | "queued"
        | "generating_text"
        | "generating_images"
        | "reviewing"
        | "scheduled"
        | "published"
        | "error"
      user_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      post_status: ["draft", "review", "scheduled", "published"],
      task_status: [
        "queued",
        "generating_text",
        "generating_images",
        "reviewing",
        "scheduled",
        "published",
        "error",
      ],
      user_role: ["admin", "editor"],
    },
  },
} as const
