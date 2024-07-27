import { create } from 'zustand';
import OpenAI from 'openai';
import { StringConstants } from '@/lib/defaultHistory';

console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  dangerouslyAllowBrowser: true,
});

interface PromptItem {
  id: number | string;
  prompt: string;
  result?: string;
  loading?: boolean;
  error?: string;
}

interface PromptHistoryStore {
  history: PromptItem[];
  addItem: (item: PromptItem) => void;
  updateItem: (index: number, updates: Partial<PromptItem>) => void;
  generateFromPromptMock: (prompt: string) => Promise<void>;
  generateFromPrompt: (prompt: string) => Promise<void>;
}

const CONTEXT = StringConstants.systemMessage; // Replace with your actual context

export const usePromptHistoryStore = create<PromptHistoryStore>((set, get) => ({
  history: StringConstants.defaultHistoryPromptResultPairs,

  addItem: (item: PromptItem) =>
    set(state => ({
      history: [...state.history, item],
    })),

  updateItem: (index: number, updates: Partial<PromptItem>) =>
    set(state => ({
      history: state.history.map((item, i) => (i === index ? { ...item, ...updates } : item)),
    })),

  generateFromPromptMock: async (prompt: string) => {
    const nextId = get().history.length + 1;
    const newItem: PromptItem = {
      id: nextId,
      prompt,
      result: '',
      loading: true,
      error: undefined,
    };
    get().addItem(newItem);
    const newItemIndex = get().history.length - 1;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = prompt.split('').reverse().join('');
      get().updateItem(newItemIndex, { result, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        get().updateItem(newItemIndex, { error: error.message, loading: false });
      } else {
        get().updateItem(newItemIndex, { error: 'An unknown error occurred', loading: false });
      }
    }
  },

  generateFromPrompt: async (prompt: string) => {
    const nextId = get().history.length + 1;
    const newItem: PromptItem = {
      id: nextId,
      prompt,
      result: '',
      loading: true,
      error: undefined,
    };
    get().addItem(newItem);
    const newItemIndex = get().history.length - 1;

    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: CONTEXT },
          { role: 'user', content: prompt },
        ],
        stream: true,
        response_format: {
          type: 'json_object',
        },
      });

      let result = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        result += content;
        get().updateItem(newItemIndex, { result, loading: true });
      }

      get().updateItem(newItemIndex, { loading: false });
    } catch (error) {
      if (error instanceof Error) {
        get().updateItem(newItemIndex, { error: error.message, loading: false });
      } else {
        get().updateItem(newItemIndex, { error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));

export default usePromptHistoryStore;
