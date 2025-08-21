import { useEffect } from 'react';
import { useUIStore } from '../stores/ui';

export const useAutoCloseSidebar = (breakpoint = 768) => {
  const { setSidebarOpen } = useUIStore();

  useEffect(() => {
    console.log('useAutoCloseSidebar');
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setSidebarOpen(false);
      }
    };

    handleMediaChange(mediaQuery); // 초기 상태 확인
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [breakpoint, setSidebarOpen]);
};
