import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userProfile, conversationHistory } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create Supabase client to fetch properties and artesanatos
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all properties
    const { data: properties, error: propError } = await supabase
      .rpc('get_property_public_view');
    
    if (propError) {
      console.error('Error fetching properties:', propError);
      throw new Error('Failed to fetch properties');
    }

    // Fetch all artesanatos
    const { data: artesanatos, error: artError } = await supabase
      .rpc('get_artesanatos_public_view');
    
    if (artError) {
      console.error('Error fetching artesanatos:', artError);
      throw new Error('Failed to fetch artesanatos');
    }

    // Build context about available attractions
    const propertiesContext = (properties || []).map((p: any) => ({
      id: p.id,
      nome: p.nome,
      tipo: p.tipo_propriedade,
      cidade: p.cidade,
      estado: p.estado,
      descricao: p.descricao,
      atividades: p.atividades,
      infraestrutura: p.infraestrutura,
      preco: p.preco_visita,
      capacidade: p.capacidade_visitantes,
    }));

    const artesanatosContext = (artesanatos || []).map((a: any) => ({
      id: a.id,
      nome: a.nome,
      categoria: a.categoria,
      descricao: a.descricao,
      artesao: a.artesao_nome,
    }));

    const systemPrompt = `Você é um assistente de turismo rural da Rural Time. Seja direto e objetivo.

DADOS DISPONÍVEIS:
Propriedades Rurais: ${JSON.stringify(propertiesContext)}
Artesanatos: ${JSON.stringify(artesanatosContext)}

REGRAS:
1. Na PRIMEIRA mensagem, faça apenas UMA pergunta curta: "Quais experiências você mais curte? (ex: natureza, gastronomia, aventura, relaxamento, animais)"
2. Após a PRIMEIRA resposta do usuário, IMEDIATAMENTE gere as recomendações baseadas no que ele disse.
3. Cruze as preferências do usuário com as descrições, atividades e tipos das propriedades/artesanatos.

FORMATO DE RESPOSTA APÓS O USUÁRIO RESPONDER:
Sempre responda com JSON válido:
{
  "type": "recommendations",
  "message": "Baseado no seu interesse em [preferência], encontrei estas opções perfeitas para você!",
  "attractions": [
    {"id": "uuid-da-propriedade", "name": "Nome", "reason": "Motivo curto", "type": "property"}
  ],
  "artesanatos": [
    {"id": "uuid-do-artesanato", "name": "Nome", "reason": "Motivo curto", "type": "artesanato"}
  ]
}

IMPORTANTE:
- Recomende exatamente 5 atrativos e 2 artesanatos (ou menos se não houver dados suficientes)
- Use os IDs reais dos dados fornecidos
- Seja breve nas razões (máximo 10 palavras)
- Responda sempre em português brasileiro`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Muitas requisições. Aguarde um momento e tente novamente." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Serviço temporariamente indisponível. Tente novamente mais tarde." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao processar sua solicitação" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ 
      response: aiMessage,
      propertiesCount: propertiesContext.length,
      artesanatosCount: artesanatosContext.length 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in recommend-attractions:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Erro desconhecido" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
