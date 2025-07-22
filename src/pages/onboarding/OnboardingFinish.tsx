// src/pages/onboarding/OnboardingFinish.tsx

import vecologo from '../../assets/logos/vecologo.svg';
import PageIndicator from '../../components/Onboarding/PageIndicator';
import onboardingSteps from '../../constants/onboardingSteps';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';

const OnboardingFinish = () => {
  // useOnboardingGuard(3); API 연결 후 훅 사용 예정
  return (
    <div className="flex flex-col items-center gap-[3.2rem]">
      {/* 인디케이터 */}
      <PageIndicator currentStep={3} steps={onboardingSteps} />
      {/* 본문 */}
      <div className="flex flex-col items-center gap-[11.4rem]">
        <div className="flex flex-col gap-[3.2rem]">
          {/* 백호 로고 & 백호 텍스트 */}
          <div className="flex flex-col items-center gap-[1.6rem]">
            <img src={vecologo} alt="Veco" className="w-[12.2rem] h-[11.1726rem]" />
            <h2 className="font-title-b text-primary-blue">Veco</h2>
          </div>
          {/* 툴 소개 문구 */}
          <h1 className="min-w-max px-5 font-bigtitle-b text-gray-600">
            속도의 관성을 유지하여 목표를 달성하는 협업툴
          </h1>
        </div>
        {/* 지금 시작하기 버튼 */}
        <PrimaryButton text="지금 시작하기" to="/workspace/team/default" />
      </div>
    </div>
  );
};

export default OnboardingFinish;
