// src/pages/onboarding/OnboardingInviteMember.tsx

import { useRef, useState, useEffect } from 'react';
import CopyToClipboard from '../../components/Onboarding/CopyToClipboard';
import PageIndicator from '../../components/Onboarding/PageIndicator';
import onboardingSteps from '../../constants/onboardingSteps';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const OnboardingInviteMember = () => {
  const [inviteText, setInviteText] = useState('');

  // 텍스트 영역의 DOM 요소에 접근하기 위한 ref (복사 기능용)
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { getItem: getInviteUrl } = useLocalStorage(LOCAL_STORAGE_KEY.inviteUrl);
  const { getItem: getInvitePassword } = useLocalStorage(LOCAL_STORAGE_KEY.invitePassword);
  const { getItem: getName } = useLocalStorage(LOCAL_STORAGE_KEY.name);

  useEffect(() => {
    const inviteUrl = getInviteUrl() ?? '';
    const invitePassword = getInvitePassword() ?? '';

    setInviteText(`팀원 URL : ${inviteUrl}\n\n암호 : ${invitePassword}`);
  }, []);

  return (
    <div className="flex flex-col items-center gap-[3.2rem]">
      {/* 인디케이터 */}
      <PageIndicator currentStep={2} steps={onboardingSteps} />
      {/* 본문 */}
      <div className="flex flex-col items-center gap-[7.3rem]">
        <div className="flex flex-col items-center gap-[3.2rem]">
          {/* 초대 문구 */}
          <div className="flex flex-col text-center gap-[1rem]">
            <h1 className="font-bigtitle-b text-primary-blue">팀원 초대</h1>
            <p className="font-title-sub-r text-gray-600">팀원을 {getName()}님의 팀에 초대해봐요</p>
          </div>
          <div className="flex items-start gap-[1rem]">
            {/* 입력창 */}
            <textarea
              ref={inputRef}
              value={inviteText}
              readOnly
              className="cursor-default select-none bg-gray-200 text-gray-600 w-[35rem] h-[16.7rem] rounded-[0.5rem] px-[2rem] py-[1.8rem] font-xsmall-r focus:outline-none resize-none"
            />
            {/* 복사 버튼 */}
            <CopyToClipboard inputRef={inputRef} />
          </div>
        </div>
        {/* 팀원 초대 완료 버튼 */}
        <PrimaryButton text="팀원 초대 완료" to="/onboarding/fin" />
      </div>
    </div>
  );
};

export default OnboardingInviteMember;
