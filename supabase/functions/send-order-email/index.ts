import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@1.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const resend = new Resend('re_daiPDYCu_B32rmFdKv5vkfVDgUQ6mHhYp');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, from, subject, text } = await req.json();

    console.log('Attempting to send email with:', { to, from, subject });

    const data = await resend.emails.send({
      from: 'Webbuilder <onboarding@resend.dev>',
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ message: "Email sent successfully", data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}); 