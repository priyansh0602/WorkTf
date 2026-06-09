import Groq from 'groq-sdk';
import { config } from '../config';

export const groqClient = new Groq({ apiKey: config.groqApiKey });

export const GROQ_MODEL = 'llama3-70b-8192';
