import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-VOUCHER-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const body = await req.json();
    const { 
      propriedadeId, 
      compradorNome, 
      compradorEmail, 
      beneficiarioNome, 
      beneficiarioEmail, 
      valor = 4999 // Default value in cents ($49.99)
    } = body;

    if (!propriedadeId || !compradorNome || !compradorEmail) {
      throw new Error("Missing required fields: propriedadeId, compradorNome, compradorEmail");
    }

    logStep("Request validated", { propriedadeId, compradorNome, compradorEmail, beneficiarioNome });

    // Initialize Supabase with service role key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify property exists
    const { data: propriedade, error: propError } = await supabase
      .from("propriedades")
      .select("nome")
      .eq("id", propriedadeId)
      .single();

    if (propError || !propriedade) {
      throw new Error("Property not found");
    }

    logStep("Property found", { propriedadeName: propriedade.nome });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists by email
    const customers = await stripe.customers.list({ 
      email: compradorEmail, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("Creating new customer for", { email: compradorEmail });
    }

    // Create checkout session for voucher purchase
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : compradorEmail,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: { 
              name: `Voucher de Experiência - ${propriedade.nome}`,
              description: beneficiarioNome 
                ? `Presente para: ${beneficiarioNome}`
                : "Voucher de experiência rural"
            },
            unit_amount: valor,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/voucher-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/voucher-canceled`,
      metadata: {
        propriedadeId,
        compradorNome,
        compradorEmail,
        beneficiarioNome: beneficiarioNome || '',
        beneficiarioEmail: beneficiarioEmail || '',
        valor: valor.toString()
      }
    });

    logStep("Stripe session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});