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

    const systemPrompt = `Você é um assistente especialista em turismo rural brasileiro da Rural Time. 
Seu objetivo é ajudar os visitantes a encontrar as melhores experiências rurais baseadas em seus interesses e perfil.

SUAS CAPACIDADES:
1. Fazer perguntas para entender o perfil do visitante (viaja sozinho, em casal, família com crianças, grupo de amigos)
2. Descobrir preferências de experiências (aventura, relaxamento, gastronomia, contato com animais, natureza, cultura)
3. Entender restrições (acessibilidade, orçamento, distância)
4. Recomendar atrativos turísticos e artesanatos personalizados

DADOS DISPONÍVEIS:
Propriedades Rurais: ${JSON.stringify(propertiesContext)}
Artesanatos: ${JSON.stringify(artesanatosContext)}

FLUXO DE CONVERSA:
1. Cumprimente o usuário e pergunte como ele prefere viajar (sozinho, casal, família, grupo)
2. Pergunte sobre tipos de experiências que mais interessam
3. Pergunte sobre alguma preferência específica (localização, preço, atividades)
4. Após coletar informações suficientes (mínimo 2-3 respostas), gere recomendações

FORMATO DE RECOMENDAÇÃO:
Quando tiver informações suficientes, responda com um JSON no seguinte formato:
{
  "type": "recommendations",
  "message": "Texto explicativo sobre as recomendações",
  "attractions": [
    {"id": "uuid", "name": "Nome", "reason": "Motivo da recomendação", "type": "property"}
  ],
  "artesanatos": [
    {"id": "uuid", "name": "Nome", "reason": "Motivo da recomendação", "type": "artesanato"}
  ]
}

Se ainda estiver coletando informações, responda com:
{
  "type": "question",
  "message": "Sua pergunta aqui"
}

IMPORTANTE: Sempre responda em português brasileiro. Seja acolhedor e entusiasta sobre turismo rural.
Recomende no máximo 5 atrativos turísticos e 2 artesanatos.
Cruze informações de localização, tipo de experiência e perfil do usuário para gerar recomendações personalizadas.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
    ];

    if (userProfile) {
      messages.push({ 
        role: "user", 
        content: `Perfil do usuário: ${JSON.stringify(userProfile)}` 
      });
    }

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
