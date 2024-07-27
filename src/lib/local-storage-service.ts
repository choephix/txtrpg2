const createLocalStorageService = <T>(LOCAL_STORAGE_KEY: string) => {
  const loadItems = (): T[] => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error loading items from localStorage:', error);
      return [];
    }
  };

  const saveItems = (items: T[]): void => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to localStorage:', error);
    }
  };

  return {
    loadItems,
    saveItems,
  };
};

export default createLocalStorageService;
