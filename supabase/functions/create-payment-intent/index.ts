import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount_cents, currency, donor_name, donor_email, is_anonymous, display_name, display_amount, message, tier } = await req.json();

    if (!amount_cents || amount_cents < 100) {
      return new Response(JSON.stringify({ error: "Minimum donation is $1" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // TODO: Create Stripe PaymentIntent here when Stripe is enabled
    // const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount_cents,
    //   currency: currency || 'usd',
    //   metadata: { donor_name, donor_email, tier },
    // });

    // Insert pending donation
    const { data: donation, error: dbError } = await supabase
      .from("donations")
      .insert({
        amount_cents,
        currency: currency || "usd",
        donor_name,
        donor_email,
        is_anonymous: is_anonymous ?? false,
        display_name: display_name ?? false,
        display_amount: display_amount ?? false,
        message: message || null,
        tier,
        status: "pending",
        // stripe_payment_id: paymentIntent.id, // TODO: uncomment with Stripe
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({
        donationId: donation.id,
        // clientSecret: paymentIntent.client_secret, // TODO: uncomment with Stripe
        paymentIntentId: "pending_stripe_setup",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
