import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-VOUCHER] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      throw new Error("Missing sessionId");
    }

    logStep("Processing session", { sessionId });

    // Initialize Stripe and Supabase
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    logStep("Payment verified", { status: session.payment_status });

    // Generate unique voucher code
    const { data: codeData, error: codeError } = await supabase
      .rpc("generate_voucher_code");

    if (codeError) throw new Error(`Failed to generate voucher code: ${codeError.message}`);
    
    const voucherCode = codeData;
    logStep("Generated voucher code", { code: voucherCode });

    // Create QR code data (simple text for now)
    const qrCodeData = `VOUCHER:${voucherCode}:${session.metadata?.propriedadeId}`;

    // Insert voucher into database
    const { data: voucher, error: voucherError } = await supabase
      .from("vouchers")
      .insert({
        codigo: voucherCode,
        propriedade_id: session.metadata?.propriedadeId,
        comprador_nome: session.metadata?.compradorNome,
        comprador_email: session.metadata?.compradorEmail,
        beneficiario_nome: session.metadata?.beneficiarioNome || null,
        beneficiario_email: session.metadata?.beneficiarioEmail || null,
        stripe_payment_intent_id: session.payment_intent,
        valor: parseInt(session.metadata?.valor || '0') / 100, // Convert back to real value
        qr_code_data: qrCodeData,
        status: 'ativo'
      })
      .select()
      .single();

    if (voucherError) {
      logStep("Error creating voucher", { error: voucherError });
      throw new Error(`Failed to create voucher: ${voucherError.message}`);
    }

    logStep("Voucher created successfully", { voucherId: voucher.id, code: voucherCode });

    return new Response(JSON.stringify({ 
      success: true,
      voucher: {
        codigo: voucher.codigo,
        qrCodeData: voucher.qr_code_data,
        valor: voucher.valor,
        dataExpiracao: voucher.data_expiracao
      }
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