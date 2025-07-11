// src/pages/OnboardingInviteMembers.tsx

import { useRef, useState } from 'react';
import CopyToClipboard from '../components/Onboarding/CopyToClipboard';
import PageIndicator from '../components/Onboarding/PageIndicator';
import onboardingSteps from '../constants/onboardingSteps';

const OnboardingInviteMembers = () => {
  // 사용자가 입력한 초대 URL과 암호를 저장하는 상태
  const [inviteText, setInviteText] = useState('');

  // 텍스트 영역의 DOM 요소에 접근하기 위한 ref (복사 기능용)
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      <div className="flex flex-col items-center gap-[3.2rem]">
        {/* 인디케이터 */}
        <PageIndicator currentStep={1} steps={onboardingSteps} />
        {/* 본문 */}
        <div className="flex flex-col items-center gap-[7.3rem]">
          <div className="flex flex-col items-center gap-[3.2rem]">
            {/* 초대 문구 */}
            <div className="flex flex-col text-center gap-[1rem]">
              <h1 className="font-bigtitle-b text-primary-blue">팀원 초대</h1>
              <p className="font-title-sub-r text-gray-600">팀원을 OO님의 팀에 초대해봐요</p>
              {/* 백엔드 연동 후 사용자 이름을 동적으로 바인딩 할 것 */}
            </div>
            <div className="flex items-start gap-[1rem]">
              {/* 입력창 */}
              <textarea
                ref={inputRef}
                value={inviteText}
                onChange={(e) => setInviteText(e.target.value)} // 사용자가 입력한 내용을 상태로 저장
                className="bg-gray-200 text-gray-600 w-[35rem] h-[16.7rem] rounded-[0.5rem] px-[2rem] py-[1.8rem] font-xsmall-r focus:outline-none resize-none"
              />
              {/* 복사 버튼 */}
              <CopyToClipboard inputRef={inputRef} />
            </div>
          </div>
          {/* 팀원 초대 완료 버튼 */}
          <button className="w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-primary-blue">
            <span className="font-title-sub-r text-gray-100">팀원 초대 완료</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingInviteMembers;
