import { create } from 'zustand';

interface PromptItem {
  id?: number;
  prompt: string;
  result: string;
  loading?: boolean;
  error?: string;
}

interface PromptHistoryStore {
  history: PromptItem[];
  addItem: (prompt: string) => void;
  updateItem: (index: number, updates: Partial<PromptItem>) => void;
  generateFromPrompt: (prompt: string) => Promise<void>;
}

const usePromptHistoryStore = create<PromptHistoryStore>((set, get) => ({
  history: [
    {
      id: 1,
      prompt: 'Hello! How can I assist you today?',
      result: "I'm an AI assistant created by Anthropic to help with a variety of tasks.",
    },
    {
      id: 2,
      prompt:
        "I'm wondering if you can help me understand how airplane turbulence works. I'm a bit nervous about my first flight coming up.",
      result:
        "Turbulence happens when the plane encounters pockets of air that are moving differently than the surrounding air. It's kind of like sailing a boat on choppy water - the boat will bounce and shake a bit, but it's completely normal and not dangerous at all.",
    },
    {
      id: 3,
      prompt: 'Is there anything else I should know before I go?',
      result:
        "- Drink plenty of water to stay hydrated\n- Bring noise-cancelling headphones or earplugs\n- If you feel anxious, try some deep breathing or meditation exercises\n- Don't be afraid to ask the flight attendants for anything you need",
    },
  ],

  addItem: (prompt: string) =>
    set(state => ({
      history: [...state.history, { prompt, result: '', loading: false }],
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
