/**
 * MongoDB compatibility placeholder.
 * We are using Supabase for all database operations.
 */

export const connectMongoDB = async (): Promise<void> => {
  console.log('Using Supabase instead of MongoDB');
};

export const disconnectMongoDB = async (): Promise<void> => {
  // No-op: Supabase handles connection lifecycle
};
