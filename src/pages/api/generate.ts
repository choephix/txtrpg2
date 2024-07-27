// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { generateText } from 'ai';
// import { google } from '@ai-sdk/google';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
// import { createGoogleGenerativeAI as createGroq } from '@ai-sdk/google';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log('req.body', req.query);

  const { prompt } = req.query || {};
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  const { text } = await generateText({
    // model: groq('llama-3.1-8b-instant'),
    model: groq('gemma2-9b-it'),
    // model: google('models/gemini-1.5-flash-latest'),
    prompt: String(prompt),
  });

  res.status(200).json({ text });
}
