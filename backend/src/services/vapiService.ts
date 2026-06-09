import { vapiClient } from '../lib';
import * as callService from './callService';

interface VapiWebhookMessage {
  type: string;
  call?: {
    id: string;
  };
  endedReason?: string;
  durationSeconds?: number;
  artifact?: {
    transcript?: string;
    recordingUrl?: string;
  };
}

interface VapiWebhookEvent {
  message: VapiWebhookMessage;
}

interface VapiCallDetail {
  transcript?: string;
}

export async function processWebhookEvent(event: VapiWebhookEvent): Promise<void> {
  try {
    const { message } = event;

    switch (message.type) {
      case 'call-started': {
        if (message.call?.id) {
          await callService.updateCallFromWebhook(message.call.id, {
            status: 'IN_PROGRESS',
            started_at: new Date().toISOString(),
          });
        }
        break;
      }

      case 'call-ended': {
        if (message.call?.id) {
          const reason = message.endedReason || '';
          let outcome = 'ANSWERED';

          if (reason === 'voicemail') {
            outcome = 'VOICEMAIL';
          }
          if (reason.includes('error')) {
            outcome = 'FAILED';
          }
          if (reason === 'no-answer') {
            outcome = 'MISSED';
          }

          await callService.updateCallFromWebhook(message.call.id, {
            status: 'COMPLETED',
            outcome,
            duration: Math.floor(message.durationSeconds || 0),
            transcript: message.artifact?.transcript,
            recording_url: message.artifact?.recordingUrl,
            ended_at: new Date().toISOString(),
          });
        }
        break;
      }

      case 'call-failed': {
        if (message.call?.id) {
          await callService.updateCallFromWebhook(message.call.id, {
            status: 'FAILED',
            outcome: 'FAILED',
          });
        }
        break;
      }

      default:
        console.log(`Unhandled VAPI webhook event type: ${message.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook event:', error);
    throw error;
  }
}

export async function getCallTranscript(vapiCallId: string): Promise<string | undefined> {
  try {
    const response = await vapiClient.get<VapiCallDetail>(`call/${vapiCallId}`);
    return response.transcript;
  } catch (error) {
    console.error('Error fetching call transcript:', error);
    throw error;
  }
}
