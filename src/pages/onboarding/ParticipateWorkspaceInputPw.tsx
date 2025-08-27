import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import InvitePwInput from '../../components/Onboarding/InvitePwInput';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePostJoinWorkspace } from '../../apis/workspace/usePostJoinWorkspace';

const ParticipateWorkspaceInputPw = () => {
  const [inputPw, setInputPw] = useState('');
  const [hasError, setHasError] = useState(false);
  const [lastTriedPw, setLastTriedPw] = useState<string | null>(null);
  const navigate = useNavigate();

  const { getItem: getInviteToken } = useLocalStorage(LOCAL_STORAGE_KEY.token);
  const { getItem: getWorkspaceName } = useLocalStorage(LOCAL_STORAGE_KEY.workspaceName);

  const { mutate, isPending } = usePostJoinWorkspace();

  const handleClick = () => {
    if (isPending || (hasError && lastTriedPw === inputPw)) return;
    setLastTriedPw(inputPw);
    mutate(
      {
        token: getInviteToken() || '',
        password: inputPw,
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
        <img src={vecocirclenavy} alt="Veco" className="w-[10rem] h-[10rem]" />
        <h2 className="font-title-b text-gray-600">
          {getWorkspaceName()} 워크스페이스에 초대합니다.
        </h2>
        <InvitePwInput inputPw={inputPw} onChange={setInputPw} hasError={hasError} />
      </div>
      <PrimaryButton text="입장하기" onClick={handleClick} />
    </div>
  );
};

export default ParticipateWorkspaceInputPw;
