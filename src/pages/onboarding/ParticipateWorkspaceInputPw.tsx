// src/pages/onboarding/ParticipateWorkspaceInputPw.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import InviteCodeInput from '../../components/Onboarding/InviteCodeInput';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePostJoinWorkspace } from '../../apis/workspace/usePostJoinWorkspace';

const ParticipateWorkspaceInputPw = () => {
  const [inputCode, setInputCode] = useState(''); // 사용자 입력 코드 상태
  const [hasError, setHasError] = useState(false); // 사용자 입력 코드 에러 상태
  const [lastTriedCode, setLastTriedCode] = useState<string | null>(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const { getItem: getInviteToken } = useLocalStorage(LOCAL_STORAGE_KEY.token);
  const { getItem: getWorkspaceName } = useLocalStorage(LOCAL_STORAGE_KEY.workspaceName);

  const { mutate, isPending } = usePostJoinWorkspace();

  // 입장하기 버튼 클릭 시 처리 로직
  const handleClick = () => {
    // 요청 중 or 직전 실패값 그대로일경우 요청 보내지 않음
    if (isPending || (hasError && lastTriedCode === inputCode)) return;
    setLastTriedCode(inputCode);
    mutate(
      {
        token: getInviteToken() || '',
        password: inputCode,
      },
      {
        onSuccess: () => {
          setHasError(false);
          navigate('/workspace/complete');
        },
        onError: () => {
          setHasError(true);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-[6.9rem]">
      <div className="flex flex-col items-center gap-[3.2rem]">
        {/* 원형 로고 */}
        <img src={vecocirclenavy} alt="Veco" className="w-[10rem] h-[10rem]" />
        {/* 초대 문구 */}
        <h2 className="font-title-b text-gray-600">
          {getWorkspaceName()} 워크스페이스에 초대합니다.
        </h2>
        {/* 암호 입력란 */}
        <InviteCodeInput inputCode={inputCode} onChange={setInputCode} hasError={hasError} />
      </div>
      {/* 입장하기 버튼 */}
      <PrimaryButton text="입장하기" onClick={handleClick} />
    </div>
  );
};

export default ParticipateWorkspaceInputPw;
