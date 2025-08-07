import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postReIssueAccessToken } from '../../apis/auth';
import { getWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const TokenLoading = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        console.log('[TokenLoading] 시작됨');

        const accessToken = await postReIssueAccessToken();
        setItem(accessToken);
        console.log('[TokenLoading] ✅ accessToken 재발급 성공');

        // 1. 워크스페이스 정보 조회
        try {
          await getWorkspaceProfile();
          console.log('[TokenLoading] ✅ 워크스페이스 존재 → /workspace');
          navigate('/workspace');
        } catch (err: any) {
          if (err.response?.status === 404) {
            console.log('[TokenLoading] ❌ 워크스페이스 없음 (404)');

            const isInvite = localStorage.getItem('isInvite');
            console.log('[TokenLoading] 🔍 isInvite:', isInvite);

            if (isInvite === 'true') {
              console.log('[TokenLoading] 🔁 초대 사용자 → /onboarding/input-pw');
              navigate('/onboarding/input-pw');
            } else {
              console.warn('[TokenLoading] ⚠️ 일반 사용자 → /onboarding/workspace');
              navigate('/onboarding/workspace');
            }
          } else {
            console.error('[TokenLoading] ❌ 워크스페이스 조회 실패:', err);
          }
        }
      } catch (err) {
        console.error('[TokenLoading] ❌ accessToken 재발급 실패:', err);
        navigate('/onboarding'); // fallback
      }
    };

    init();
  }, [setItem, navigate]);

  return <h3 className="font-title-sub-r text-gray-600">로딩중입니다.</h3>;
};

export default TokenLoading;
