// src/pages/onboarding/ParticipateWorkspaceInputPw.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import InviteCodeInput from '../../components/Onboarding/InviteCodeInput';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';

const ParticipateWorkspaceInputPw = () => {
  const [inputCode, setInputCode] = useState(''); // 사용자 입력 코드 상태
  const [hasError, setHasError] = useState(false); // 사용자 입력 코드 에러 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const correctCode = 'tempcode'; // 올바른 초대 코드 (백엔드 연동 전 임시 하드코딩)

  // 입장하기 버튼 클릭 시 처리 로직
  const handleClick = () => {
    if (inputCode === correctCode) {
      // 옳은 코드 - 에러 제거 및 워크스페이스 홈으로 이동
      setHasError(false);
      navigate('/workspace/default/team/:teamId');
    } else {
      // 잘못된 코드 - 에러 표시
      setHasError(true);
    }
  };

  return (
    <div className="flex flex-col gap-[6.9rem]">
      <div className="flex flex-col items-center gap-[3.2rem]">
        {/* 원형 로고 */}
        <img src={vecocirclenavy} alt="Veco" className="w-[10rem] h-[10rem]" />
        {/* 초대 문구 - 백엔드 연동 후 수정 */}
        <h2 className="font-title-b text-gray-600">OOO 워크스페이스에 초대합니다.</h2>
        {/* 암호 입력란 - 백엔드 연동 후 수정 */}
        <InviteCodeInput inputCode={inputCode} onChange={setInputCode} hasError={hasError} />
      </div>
      {/* 입장하기 버튼 */}
      <PrimaryButton text="입장하기" onClick={handleClick} />
    </div>
  );
};

export default ParticipateWorkspaceInputPw;
