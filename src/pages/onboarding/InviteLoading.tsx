// src/pages/onboarding/InviteLoading.tsx
// 초대 받은 사용자를 위한 리다이렉트 페이지
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InviteLoading = () => {
  const { workspaceName } = useParams(); // URL 파라미터 추출
  const navigate = useNavigate();

  useEffect(() => {
    if (workspaceName) {
      localStorage.setItem('workspaceName', workspaceName);
      localStorage.setItem('isInvite', 'true');
      setTimeout(() => {
        navigate('/onboarding');
      }, 50);
    }
  }, [workspaceName, navigate]);

  return (
    <div className="min-w-max min-h-screen flex flex-col items-center justify-center">
      <h3 className="font-title-sub-r text-gray-600">초대 확인중입니다.</h3>;
    </div>
  );
};

export default InviteLoading;
