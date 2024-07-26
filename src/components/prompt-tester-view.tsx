import { create } from 'zustand'
import OpenAI from 'openai'

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface PromptItem {
  prompt: string;
  result: string;
  loading: boolean;
  error: string | null;
}

interface PromptHistoryStore {
  history: PromptItem[];
  addItem: (item: PromptItem) => void;
  updateItem: (index: number, updates: Partial<PromptItem>) => void;
  generateMock: (prompt: string) => Promise<void>;
  generate: (prompt: string) => Promise<void>;
}

const CONTEXT = "..."  // Replace with your actual context

const usePromptHistoryStore = create<PromptHistoryStore>((set, get) => ({
  history: [],

  addItem: (item: PromptItem) => set((state) => ({
    history: [...state.history, item]
  })),

  updateItem: (index: number, updates: Partial<PromptItem>) => set((state) => ({
    history: state.history.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    )
  })),

  generateMock: async (prompt: string) => {
    const newItem: PromptItem = { prompt, result: '', loading: true, error: null };
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

  generate: async (prompt: string) => {
    const newItem: PromptItem = { prompt, result: '', loading: true, error: null };
    get().addItem(newItem);
    const newItemIndex = get().history.length - 1;

    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: CONTEXT },
          { role: 'user', content: prompt }
        ],
        stream: true,
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
}))

export default usePromptHistoryStore
