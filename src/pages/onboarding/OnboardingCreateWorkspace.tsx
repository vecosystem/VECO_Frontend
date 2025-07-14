// src/pages/onboarding/OnboardingCreateWorkspace.tsx

import PageIndicator from '../../components/Onboarding/PageIndicator';
import onboardingSteps from '../../constants/onboardingSteps';

const OnboardingCreateWorkspace = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      <div className="flex flex-col items-center gap-[3.2rem]">
        {/* 인디케이터 */}
        <PageIndicator currentStep={0} steps={onboardingSteps} />
        {/* 본문 */}
        <div className="flex flex-col items-center gap-[7.1rem]">
          <div className="flex flex-col items-center gap-[5.9rem]">
            <div className="flex flex-col text-center gap-[1rem]">
              <h1 className="font-bigtitle-b text-primary-blue">새 워크스페이스 생성하기</h1>
              <p className="font-title-sub-r text-gray-600">
                팀이 함께 일하며 이슈들을 공유하는 환경이에요
              </p>
            </div>

            <div className="flex flex-col w-[40rem] gap-[1.6rem] items-center">
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
          </div>
          <button className="w-[40rem] h-[6.2rem] bg-primary-blue font-title-sub-r text-gray-100 rounded-[0.8rem] text-center">
            워크스페이스 생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCreateWorkspace;
