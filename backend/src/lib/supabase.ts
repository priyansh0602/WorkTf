import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

/**
 * Admin client — uses the service role key to bypass RLS.
 * Used for all backend database operations.
 */
export const supabaseAdmin: SupabaseClient = createClient(
  config.supabaseUrl,
  config.supabaseServiceKey
);

/**
 * Public client — uses the anon key.
 * Used for client-side safe operations only.
 */
export const supabaseClient: SupabaseClient = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);

/**
 * Verifies that the Supabase connection is working
 * by querying the users table.
 */
export async function checkConnection(): Promise<void> {
  const { error } = await supabaseAdmin
    .from('users')
    .select('id', { count: 'exact', head: true });

  if (error) {
    throw new Error(`Supabase connection failed: ${error.message}`);
  }

  console.log('Supabase connected successfully');
}
