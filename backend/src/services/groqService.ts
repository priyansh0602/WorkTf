import { groqClient, GROQ_MODEL } from '../lib';

export async function generateCallSummary(transcript: string): Promise<string> {
  try {
    const response = await groqClient.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a call analysis assistant. Given a call transcript provide a concise 2-3 sentence summary of what was discussed and the outcome. Be factual and brief.',
        },
        {
          role: 'user',
          content: `Summarize this call transcript: ${transcript}`,
        },
      ],
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || 'Unable to generate summary.';
  } catch (error) {
    console.error('Error generating call summary:', error);
    throw error;
  }
}

interface AgentScriptData {
  name: string;
  goal: string;
  tone: string;
  useCase: string;
  audienceType: string;
}

export async function generateAgentScript(agentData: AgentScriptData): Promise<string> {
  try {
    const response = await groqClient.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a script writing assistant for AI calling agents. Generate a professional, conversational opening script based on the agent configuration provided. Keep it natural and engaging.',
        },
        {
          role: 'user',
          content: `Generate an opening script for an AI calling agent with the following details:
Name: ${agentData.name}
Goal: ${agentData.goal}
Tone: ${agentData.tone}
Use Case: ${agentData.useCase}
Audience: ${agentData.audienceType}`,
        },
      ],
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || 'Unable to generate script.';
  } catch (error) {
    console.error('Error generating agent script:', error);
    throw error;
  }
}
