// src/pages/onboarding/InviteLoading.tsx
// 초대 받은 사용자를 위한 리다이렉트 페이지
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';

const InviteLoading = () => {
  const { workspaceName } = useParams(); // URL 파라미터 추출
  const [searchParams] = useSearchParams(); // URL query parameter
  const token = searchParams.get('token'); // token 값 추출

  const navigate = useNavigate();
  const { setItem: setWorkspaceName } = useLocalStorage(LOCAL_STORAGE_KEY.workspaceName);
  const { setItem: setIsInvite } = useLocalStorage(LOCAL_STORAGE_KEY.isInvite);
  const { setItem: setInviteToken } = useLocalStorage(LOCAL_STORAGE_KEY.token);

  useEffect(() => {
    if (workspaceName) {
      setWorkspaceName(workspaceName);
      setIsInvite('true');
      if (token) {
        setInviteToken(token);
      }
      setTimeout(() => {
        navigate('/onboarding');
      }, 50);
    }
  }, [workspaceName, token, navigate]);

  return (
    <div className="min-w-max min-h-screen flex flex-col items-center justify-center">
      <h3 className="font-title-sub-r text-gray-600">초대 확인중입니다.</h3>;
    </div>
  );
};

export default InviteLoading;
