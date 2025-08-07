/**
 * 로컬스토리지(localStorage)를 쉽게 사용하기 위한 커스텀 훅
 * - key를 인자로 받아 해당 key에 대해 set/get/remove 기능을 제공
 * - JSON 변환 없이 문자열 그대로 저장하고 불러옴
 */

export const useLocalStorage = (key: string) => {
  // localStorage에 문자열 저장
  const setItem = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error('localStorage setItem error:', error);
    }
  };

  // localStorage에서 문자열 불러오기
  const getItem = (): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error('localStorage getItem error:', error);
      return null;
    }
  };

  // localStorage에서 해당 key 삭제
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage removeItem error:', error);
    }
  };

  return { setItem, getItem, removeItem };
};
