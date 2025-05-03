import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ubraqzydrsfbgzoszifp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicmFxenlkcnNmYmd6b3N6aWZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTYwNDQ4OSwiZXhwIjoyMDYxMTgwNDg5fQ.VIF4Bx_RaEDolrGkTAhwmERJj803XPn3uCRRCx0Kzy8'
);

export async function sendEmail(to: string, subject: string, text: string) {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, text }
  });

  if (error) throw error;
  return data;
} 