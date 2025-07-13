// src/pages/onboarding/ParticipateWorkspaceInputPw.tsx

import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import InviteCodeInput from '../../components/Onboarding/InviteCodeInput';

const ParticipateWorkspaceInputPw = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      <div className="flex flex-col gap-[6.9rem]">
        <div className="flex flex-col items-center gap-[3.2rem]">
          {/* 원형 로고 */}
          <img src={vecocirclenavy} alt="Veco" className="w-[10rem] h-[10rem]" />
          {/* 초대 문구 - 백엔드 연동 후 수정 */}
          <h2 className="font-title-b text-gray-600">OOO 워크스페이스에 초대합니다.</h2>
          {/* 암호 입력란 - 백엔드 연동 후 수정 */}
          <InviteCodeInput correctCode="tempcode" />
        </div>
        {/* 입장하기 버튼 */}
        <button className="w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-primary-blue">
          <span className="font-title-sub-r text-gray-100">입장하기</span>
        </button>
      </div>
    </div>
  );
};

export default ParticipateWorkspaceInputPw;
