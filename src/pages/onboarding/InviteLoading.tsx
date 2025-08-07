// src/pages/onboarding/InviteLoading.tsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InviteLoading = () => {
  const { workspaceName } = useParams(); // 1. URL 파라미터 추출
  const navigate = useNavigate();

  useEffect(() => {
    if (workspaceName) {
      // 2. 로컬스토리지에 저장
      localStorage.setItem('workspaceName', workspaceName);
      localStorage.setItem('isInvite', 'true');

      // 3. /onboarding으로 이동
      navigate('/onboarding');
    }
  }, [workspaceName, navigate]);

  return <div>초대 경로 확인 중입니다...</div>;
};

export default InviteLoading;
