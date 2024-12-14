import {OpenAI} from 'openai'
import { openAiKey } from './env';
export const openai = new OpenAI({
    apiKey: openAiKey,
});