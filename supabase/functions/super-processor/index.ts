import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = 're_6WNJmQeM_KKEXX8J1GXtc68MvEF47ahLi'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

console.log('🚀 Edge Function loaded and ready');

serve(async (req) => {
  console.log('📥 Received request:', req.method);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('👋 Handling OPTIONS request');
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json();
    console.log('📦 Received request body:', body);

    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      console.error('❌ Missing required fields');
      throw new Error('Missing required fields: to, subject, or text');
    }

    console.log('📧 Attempting to send email to:', to);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Custom Site Studio <onboarding@resend.dev>',
        to,
        subject,
        text,
      })
    });

    const data = await response.json();
    console.log('📬 Resend API response:', data);

    if (!response.ok) {
      console.error('❌ Resend API error:', data);
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('✅ Email sent successfully');
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('❌ Function error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.response?.data || error
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}) 