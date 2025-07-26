// src/pages/onboarding/GoogleLoginRedirect.tsx
// TODO: 서버 배포 후 해당 코드 이상 있는 부분 있으면 리팩토링

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { reissueAccessToken } from '../../apis/auth';
// import { getMyProfile } from '../../apis/user';

const GoogleLoginRedirect = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  useEffect(() => {
    const fetchTokenAndProfile = async () => {
      try {
        // 로그인 직후엔 accessToken 없으므로 발급 요청
        const accessToken = await reissueAccessToken();
        setItem(accessToken);

        // TODO: 추후 getMyProfile() 호출로 이메일 유무에 따라 분기
        // const profile = await getMyProfile();
        // const email = profile.result?.email;
        // navigate(email ? '/workspace' : '/onboarding');
        navigate('/onboarding'); // 임시
      } catch (error) {
        console.error('Google 로그인 처리 실패:', error);
        navigate('/onboarding');
      }
    };

    fetchTokenAndProfile();
  }, [navigate, setItem]);

  return null;
};

export default GoogleLoginRedirect;
