import OpenAI from 'openai';
import { create } from 'zustand';

import { StringConstants } from '@/lib/defaultHistory';
import createLocalStorageService from '@/lib/local-storage-service';

const persistance = globalThis.localStorage
  ? createLocalStorageService<PromptItem>('saved_history')
  : null;

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  dangerouslyAllowBrowser: true,
});

export interface PromptItem {
  id: number | string;
  prompt: string;
  result?: string;
  loading?: boolean;
  error?: string;
}

interface PromptHistoryStore {
  history: PromptItem[];
  setHistoryItems: (items: PromptItem[]) => void;
  addItem: (item: PromptItem) => void;
  updateItem: (index: number, updates: Partial<PromptItem>) => void;
  generateFromPromptMock: (prompt: string) => Promise<void>;
  generateFromPrompt: (prompt: string) => Promise<void>;
}

const CONTEXT = StringConstants.systemMessage; // Replace with your actual context

export const usePromptHistoryStore = create<PromptHistoryStore>((set, get) => ({
  // history: persistance?.loadItems() || [],
  // history: StringConstants.defaultHistoryPromptResultPairs,
  history: [],

  setHistoryItems: (items: PromptItem[]) => set({ history: items }),

  addItem: (item: PromptItem) =>
    set(state => {
      const newHistory = [...state.history, item];
      persistance?.saveItems(newHistory);
      return { history: newHistory };
    }),

  updateItem: (index: number, updates: Partial<PromptItem>) =>
    set(state => {
      const newHistory = state.history.map((item, i) =>
        i === index ? { ...item, ...updates } : item
      );
      persistance?.saveItems(newHistory);
      return { history: newHistory };
    }),

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

      let combinedContent = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        combinedContent += content;

        const result = processResult(combinedContent);
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

globalThis.requestAnimationFrame?.(() => {
  const savedHistory = persistance?.loadItems();
  if (!savedHistory?.length) return;

  usePromptHistoryStore.getState().setHistoryItems(savedHistory);
});

function processResult(content: string) {
  try {
    const result = JSON.parse(content);
    return result.text;
  } catch (error) {
    try {
      const result = JSON.parse(content + '"}');
      return result.text;
    } catch (error) {
      return '...';
    }
  }
}
