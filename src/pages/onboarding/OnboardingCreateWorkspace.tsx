// src/pages/onboarding/OnboardingCreateWorkspace.tsx

import { useState, useEffect } from 'react';
import PageIndicator from '../../components/Onboarding/PageIndicator';
import onboardingSteps from '../../constants/onboardingSteps';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';
import WorkspaceNameInput from '../../components/Onboarding/WorkspaceNameInput';
import { postReIssueAccessToken } from '../../apis/auth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { usePostCreateWorkspace } from '../../apis/workspace/usePostCreateWorkspace';
import { useNavigate } from 'react-router-dom';

const OnboardingCreateWorkspace = () => {
  // useOnboardingGuard(1); API 연결 후 훅 사용 예정
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceUrl, setWorkspaceUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accesstoken = await postReIssueAccessToken();
      const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
      setItem(accesstoken);
    };
    fetchAccessToken();
  }, []);

  const { mutateAsync } = usePostCreateWorkspace();

  const handleButtonClick = async () => {
    try {
      const res = await mutateAsync({ workspaceName: workspaceName });
      console.log(res);
      navigate('/onboarding/invite');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[3.2rem]">
      {/* 인디케이터 */}
      <PageIndicator currentStep={1} steps={onboardingSteps} />
      {/* 본문 */}
      <div className="flex flex-col items-center gap-[5rem]">
        <div className="flex flex-col text-center gap-[1rem]">
          <h1 className="font-bigtitle-b text-primary-blue">새 워크스페이스 생성하기</h1>
          <p className="font-title-sub-r text-gray-600">
            팀이 함께 일하며 이슈들을 공유하는 환경이에요
          </p>
        </div>

        {/* 워크스페이스 이름 & 워크스페이스 URL */}
        <WorkspaceNameInput
          setWorkspaceName={setWorkspaceName}
          setWorkspaceUrl={setWorkspaceUrl}
          workspaceUrl={workspaceUrl}
          workspaceName={workspaceName}
        />

        {/* 워크스페이스 생성하기 버튼 */}
        <PrimaryButton
          text="워크스페이스 생성하기"
          disabled={!workspaceUrl}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default OnboardingCreateWorkspace;
