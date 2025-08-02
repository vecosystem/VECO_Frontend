import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    window.location.replace('https://v0-veco-qf.vercel.app');
  }, []);
  return null;
};
