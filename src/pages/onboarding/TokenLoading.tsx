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
        const accessToken = await postReIssueAccessToken();
        setItem(accessToken);
        try {
          await getWorkspaceProfile();
          navigate('/workspace');
        } catch (err: any) {
          if (err.response?.status === 404) {
            const isInvite = localStorage.getItem('isInvite');
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
