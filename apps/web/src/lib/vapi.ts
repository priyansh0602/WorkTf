import Vapi from "@vapi-ai/web";

export const vapiPublicKey =
  ((import.meta as any).env?.VITE_VAPI_PUBLIC_KEY as string) || "";

export const vapiWeb = new Vapi(vapiPublicKey);

export async function startCall(
  assistantId: string,
  _contactNumber?: string
): Promise<void> {
  await vapiWeb.start(assistantId);
}

export function endCall(): void {
  vapiWeb.stop();
}

export function setMuted(muted: boolean): void {
  vapiWeb.setMuted(muted);
}

export function onCallStart(callback: () => void): void {
  vapiWeb.on("call-start", callback);
}

export function onCallEnd(callback: () => void): void {
  vapiWeb.on("call-end", callback);
}

export function onSpeechStart(callback: () => void): void {
  vapiWeb.on("speech-start", callback);
}

export function onSpeechEnd(callback: () => void): void {
  vapiWeb.on("speech-end", callback);
}
