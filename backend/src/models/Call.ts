export interface ICallDocument {
  id: string;
  agent_id: string;
  user_id: string;
  vapi_call_id?: string;
  contact_name: string;
  contact_number: string;
  direction: string;
  status: string;
  outcome?: string;
  duration: number;
  transcript?: string;
  recording_url?: string;
  started_at?: string;
  ended_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ICallInsert {
  agent_id: string;
  user_id: string;
  contact_name: string;
  contact_number: string;
  direction: string;
  status: string;
  vapi_call_id?: string;
  outcome?: string;
  duration?: number;
  transcript?: string;
  recording_url?: string;
  started_at?: string;
  ended_at?: string;
}
