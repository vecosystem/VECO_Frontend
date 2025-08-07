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
        console.log('[TokenLoading] ✅ accessToken 재발급 시도');
        const accessToken = await postReIssueAccessToken();
        setItem(accessToken);
        console.log('[TokenLoading] ✅ accessToken 재발급 성공:', accessToken);

        // 워크스페이스 정보 조회
        console.log('[TokenLoading] 🔍 워크스페이스 정보 조회 시도');
        try {
          await getWorkspaceProfile();
          console.log('[TokenLoading] ✅ 워크스페이스 존재 → /workspace로 이동');
          navigate('/workspace');
        } catch (err: any) {
          if (err.response?.status === 404) {
            // 워크스페이스 없음 → 초대 여부 확인
            const isInvite = localStorage.getItem('isInvite');
            console.log('[TokenLoading] 🔍 isInvite:', isInvite);

            if (isInvite === null) {
              console.warn('[TokenLoading] ⚠️ 워크스페이스 없음 → /onboarding/workspace로 이동');
              navigate('/onboarding/workspace');
            } else {
              console.log('[TokenLoading] 🔁 초대 사용자 → /onboarding/input-pw로 이동');
              navigate('/onboarding/input-pw');
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
