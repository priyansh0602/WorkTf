export interface IUserDocument {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  calls_used: number;
  calls_limit: number;
  agent_id?: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUserInsert {
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  plan?: string;
  calls_used?: number;
  calls_limit?: number;
}
