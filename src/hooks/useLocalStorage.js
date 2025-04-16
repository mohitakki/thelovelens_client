export const useLocalStorage = () => {
  // Get item from localStorage
  const getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  };

  // Set item in localStorage
  const setItem = (key, value) => {
    try {
      const valueToStore = JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
      return true;
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
      return false;
    }
  };

  // Remove item from localStorage
  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
      return false;
    }
  };

  // Clear all items from localStorage
  const clear = () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear
  };
};
