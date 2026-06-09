export interface IAgentDocument {
  id: string;
  user_id: string;
  name: string;
  voice_style: string;
  tone: string;
  use_case: string;
  goal: string;
  call_volume: string;
  audience_type: string;
  inbound_enabled: boolean;
  outbound_enabled: boolean;
  voicemail_detection: boolean;
  call_recording: boolean;
  vapi_assistant_id?: string;
  vapi_phone_number_id?: string;
  is_active: boolean;
  enabled_channels: string[];
  created_at: string;
  updated_at: string;
}

export interface IAgentInsert {
  user_id: string;
  name?: string;
  voice_style?: string;
  tone?: string;
  use_case?: string;
  goal?: string;
  call_volume?: string;
  audience_type?: string;
  inbound_enabled?: boolean;
  outbound_enabled?: boolean;
  voicemail_detection?: boolean;
  call_recording?: boolean;
  vapi_assistant_id?: string;
  vapi_phone_number_id?: string;
  is_active?: boolean;
  enabled_channels?: string[];
}
