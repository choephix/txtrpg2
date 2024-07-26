import { create } from 'zustand';

interface PromptItem {
  prompt: string;
  result: string;
  loading: boolean;
  error: string | null;
}

interface PromptHistoryStore {
  history: PromptItem[];
  addItem: (prompt: string) => void;
  updateItem: (index: number, updates: Partial<PromptItem>) => void;
  generateFromPrompt: (prompt: string) => Promise<void>;
}

const usePromptHistoryStore = create<PromptHistoryStore>((set, get) => ({
  history: [],

  addItem: (prompt: string) =>
    set(state => ({
      history: [...state.history, { prompt, result: '', loading: false, error: null }],
    })),

  updateItem: (index: number, updates: Partial<PromptItem>) =>
    set(state => ({
      history: state.history.map((item, i) => (i === index ? { ...item, ...updates } : item)),
    })),

  generateFromPrompt: async (prompt: string) => {
    const newItemIndex = get().history.length;

    // Add new item with loading state
    get().addItem(prompt);
    get().updateItem(newItemIndex, { loading: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate inverse of the prompt as the result
      const result = prompt.split('').reverse().join('');

      // Update item with result
      get().updateItem(newItemIndex, { result, loading: false });
    } catch (error) {
      // Update item with error
      if (error instanceof Error) {
        get().updateItem(newItemIndex, { error: error.message, loading: false });
      } else {
        get().updateItem(newItemIndex, { error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));

export default usePromptHistoryStore;
