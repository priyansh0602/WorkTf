import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Please set it in your .env file or environment.`
    );
  }
  return value;
}

interface AppConfig {
  port: number;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceKey: string;
  groqApiKey: string;
  vapiApiKey: string;
  vapiPhoneNumberId: string;
  clientUrl: string;
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '8080', 10),
  supabaseUrl: requireEnv('SUPABASE_URL'),
  supabaseAnonKey: requireEnv('SUPABASE_ANON_KEY'),
  supabaseServiceKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  groqApiKey: requireEnv('GROQ_API_KEY'),
  vapiApiKey: requireEnv('VAPI_API_KEY'),
  vapiPhoneNumberId: requireEnv('VAPI_PHONE_NUMBER_ID'),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
