// src/pages/onboarding/GoogleLoginRedirect.tsx

import { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { postReIssueAccessToken } from '../../apis/auth';

const GoogleLoginRedirect = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  useEffect(() => {
    postReIssueAccessToken().then((accessToken) => {
      setItem(accessToken);
    });
  }, [setItem]);

  return null;
};

export default GoogleLoginRedirect;
