// src/pages/onboarding/TokenLoading.tsx
// accessToken 저장 및 워크스페이스 조회하는 리다이렉트 페이지
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postReIssueAccessToken } from '../../apis/auth';
import { getWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const TokenLoading = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.isInvite);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        // accessToken 발급
        const accessToken = await postReIssueAccessToken();
        setItem(accessToken);
        try {
          await getWorkspaceProfile(); // 워크스페이스 조회
          // 200 응답 -> 워크스페이스 홈으로 이동
          navigate('/workspace');
        } catch (err: any) {
          // 404 응답 -> isInvite 따라 분기 처리
          if (err.response?.status === 404) {
            const isInvite = getItem();
            if (isInvite === 'true') {
              navigate('/onboarding/input-pw');
            } else {
              navigate('/onboarding/workspace');
            }
          } else {
            console.log('[TokenLoading] ❌ 워크스페이스 조회 실패:', err);
          }
        }
      } catch (err) {
        navigate('/onboarding'); // fallback
      }
    };

    init();
  }, [setItem, navigate]);

  return <h3 className="font-title-sub-r text-gray-600">로딩중입니다.</h3>;
};

export default TokenLoading;
