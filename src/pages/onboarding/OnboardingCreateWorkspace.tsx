// src/pages/onboarding/OnboardingCreateWorkspace.tsx

import PageIndicator from '../../components/Onboarding/PageIndicator';
import onboardingSteps from '../../constants/onboardingSteps';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';
import WorkspaceNameInput from '../../components/Onboarding/WorkspaceNameInput';
import { usePostCreateWorkspace } from '../../apis/workspace/usePostCreateWorkspace';
import { useNavigate } from 'react-router-dom';
import { useOnboardingWS } from '../../stores/onboardingWorkspace';
import { useOnboardingStatus } from '../../stores/onboardingStatus';

const OnboardingCreateWorkspace = () => {
  const { workspaceName, workspaceUrl, isLocked, setWorkspaceName, setWorkspaceUrl, setIsLocked } =
    useOnboardingWS();
  const { workspaceCreated, setWorkspaceCreated } = useOnboardingStatus();
  const navigate = useNavigate();
  const { mutateAsync } = usePostCreateWorkspace();

  const handleButtonClick = async () => {
    // 이미 한 번 성공했다면: 재요청 없이 바로 이동
    if (workspaceCreated) {
      navigate('/onboarding/invite');
      return;
    }

    try {
      await mutateAsync({ workspaceName });
      setWorkspaceCreated(true);
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
          workspaceName={workspaceName}
          workspaceUrl={workspaceUrl}
          isLocked={isLocked}
          setWorkspaceName={setWorkspaceName}
          setWorkspaceUrl={setWorkspaceUrl}
          setIsLocked={setIsLocked}
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
