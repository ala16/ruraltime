import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Você é o RuralTime AI, um assistente especialista em turismo rural brasileiro. Seu objetivo é ajudar proprietários rurais a implementar e melhorar o turismo rural em suas propriedades.

Você é especialista em:
- Planejamento e implementação de turismo rural
- Agroturismo e experiências no campo
- Legislação e regulamentação do turismo rural no Brasil
- Infraestrutura necessária (hospedagem, trilhas, restaurante rural)
- Marketing e divulgação de propriedades rurais
- Sustentabilidade e turismo ecológico
- Gastronomia rural e produtos artesanais
- Atividades e experiências para visitantes (cavalgada, pesca, ordenha, colheita)
- Precificação de serviços turísticos rurais
- Certificações e selos de qualidade

REGRAS:
- Responda sempre em português brasileiro
- Seja prático e objetivo, dando conselhos acionáveis
- Use exemplos reais do contexto brasileiro quando possível
- Formate suas respostas com markdown (títulos, listas, negrito) para melhor legibilidade
- Quando apropriado, sugira próximos passos claros
- Seja acolhedor e encorajador com proprietários que estão começando`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Aguarde um momento e tente novamente." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Serviço temporariamente indisponível." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao processar sua solicitação" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("rural-ai-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
