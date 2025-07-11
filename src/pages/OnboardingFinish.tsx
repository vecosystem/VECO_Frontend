// src/pages/OnboardingFinish.tsx

import vecologo from '../assets/logos/vecologo.svg';
import PageIndicator from '../components/Onboarding/PageIndicator';
import onboardingSteps from '../constants/onboardingSteps';
import '../index.css';

const OnboardingFinish = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      <div className="flex flex-col items-center gap-[3.2rem]">
        {/* 인디케이터 */}
        <PageIndicator currentStep={2} steps={onboardingSteps} />
        {/* 본문 */}
        <div className="flex flex-col items-center gap-[11.4rem]">
          <div className="flex flex-col gap-[3.2rem]">
            {/* 백호 로고 & 백호 텍스트 */}
            <div className="flex flex-col items-center gap-[1.6rem]">
              <img src={vecologo} alt="Veco" className="w-[12.2rem] h-[11.1726rem]" />
              <h2 className="font-title-b text-primary-blue">Veco</h2>
            </div>
            {/* 툴 소개 문구 */}
            <h1 className="font-bigtitle-b text-gray-600 text-center">
              속도의 관성을 유지하여 목표를 달성하는 협업툴
            </h1>
          </div>
          {/* 지금 시작하기 버튼 */}
          <button className="w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-primary-blue">
            <span className="font-title-sub-r text-gray-100">지금 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFinish;
