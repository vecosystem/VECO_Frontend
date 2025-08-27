export const useLocalStorage = (key: string) => {
  const setItem = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error('localStorage setItem error:', error);
    }
  };
  const getItem = (): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error('localStorage getItem error:', error);
      return null;
    }
  };
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage removeItem error:', error);
    }
  };

  return { setItem, getItem, removeItem };
};
