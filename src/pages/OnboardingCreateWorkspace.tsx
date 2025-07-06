// src/pages/OnboardingCreateWorkspace.tsx

import PageIndicator from '../components/Onboarding/PageIndicator';
import onboardingSteps from '../constants/onboardingSteps';
import '../index.css';

const OnboardingCreateWorkspace = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      {/* 인디케이터 */}
      <PageIndicator currentStep={0} steps={onboardingSteps} />
      {/* 본문 */}
      <div className="mt-[6.4rem] text-center">
        <h1 className="font-bigtitle-b text-primary-blue">새 워크스페이스 생성하기</h1>
        <p className="font-title-sub-r text-gray-600 mt-[2rem]">
          팀이 함께 일하며 이슈들을 공유하는 환경이에요
        </p>

        <div className="flex flex-col w-[40rem] gap-[1.6rem] mt-[3.2rem] items-center">
          <input
            type="text"
            placeholder="워크스페이스 이름"
            className="w-full h-[6.2rem] rounded-[0.5rem] bg-gray-200 px-[2rem] font-body-r text-gray-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="워크스페이스 URL"
            className="w-full h-[6.2rem] rounded-[0.5rem] bg-gray-200 px-[2rem] font-body-r text-gray-400 focus:outline-none"
          />
        </div>

        <button className="mt-[3.2rem] w-[40rem] h-[6.2rem] bg-primary-blue font-title-sub-r text-gray-100 rounded-[0.8rem] text-center">
          워크스페이스 생성하기
        </button>
      </div>
    </div>
  );
};

export default OnboardingCreateWorkspace;
