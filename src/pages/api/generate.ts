// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { generateObject } from 'ai';
import { z } from 'zod';

import { generateText } from 'ai';
// import { google } from '@ai-sdk/google';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { StringConstants } from '@/lib/defaultHistory';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log('req.body', req.query);

  const { prompt } = req.query || {};
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  const model = groq('gemma2-9b-it');
  // const model = google('models/gemini-1.5-flash-latest', {});
  // const model = groq('llama-3.1-8b-instant');

  const schema = z.object({
    text: z.string(),
  });

  const { object } = await generateObject({
    model: model,
    schema: schema,
    prompt: String(prompt),
    system: StringConstants.systemMessage,
    temperature: 0.3,
  });

  res.status(200).json(object);
}
