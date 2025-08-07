// src/pages/onboarding/InviteLoading.tsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InviteLoading = () => {
  const { workspaceName } = useParams(); // 1. URL 파라미터 추출
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[InviteLoading] 실행됨!');
    if (workspaceName) {
      console.log('[InviteLoading] 저장 시도:', workspaceName);
      localStorage.setItem('workspaceName', workspaceName);
      localStorage.setItem('isInvite', 'true');

      setTimeout(() => {
        console.log('[InviteLoading] /onboarding으로 이동');
        navigate('/onboarding');
      }, 50);
    }
  }, [workspaceName, navigate]);

  return <h3 className="font-title-sub-r text-gray-600">초대 확인중입니다.</h3>;
};

export default InviteLoading;
