import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ubraqzydrsfbgzoszifp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicmFxenlkcnNmYmd6b3N6aWZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTYwNDQ4OSwiZXhwIjoyMDYxMTgwNDg5fQ.VIF4Bx_RaEDolrGkTAhwmERJj803XPn3uCRRCx0Kzy8';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function sendEmail(to: string, subject: string, text: string) {
  console.log('🚀 Starting sendEmail function');
  console.log('📧 Email details:', { to, subject, textLength: text?.length });
  
  try {
    console.log('📞 Calling Supabase function super-processor...');
    
    // Direkter Fetch-Aufruf zur Edge Function
    const response = await fetch(`${supabaseUrl}/functions/v1/super-processor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to, subject, text })
    });

    console.log('📥 Raw response:', response);
    
    const data = await response.json();
    console.log('📦 Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    console.log('✅ Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Error in sendEmail:', error);
    throw error;
  }
} 