/**
 * 로컬스토리지(localStorage)를 쉽게 사용하기 위한 커스텀 훅
 * - JSON 형태로 데이터를 저장하고 불러오도록 구성됨
 * - key를 인자로 받아 해당 key에 대해 set/get/remove 기능을 제공
 */

export const useLocalStorage = (key: string) => {
  // localStorage에 값 저장
  const setItem = (value: unknown) => {
    try {
      // 값을 JSON 문자열로 변환해서 저장
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage setItem error:', error);
    }
  };

  // localStorage에서 값 조회 (없으면 null)
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      // 문자열을 다시 객체나 원래 값으로 변환해서 반환
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('localStorage getItem error:', error);
      return null;
    }
  };

  // localStorage에서 해당 key의 값 제거
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage removeItem error:', error);
    }
  };

  return { setItem, getItem, removeItem };
};
