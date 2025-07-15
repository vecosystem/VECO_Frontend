import { useState } from 'react';
import whitecheck from '../../assets/icons/whitecheck.svg';

interface WorkspaceNameInputProps {
  onUrlGenerated: (url: string) => void;
}

const WorkspaceNameInput = ({ onUrlGenerated }: WorkspaceNameInputProps) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [error, setError] = useState('');

  const handleCheck = async () => {
    const name = workspaceName.trim();

    if (name.length < 4 || name.length > 10) {
      setError('워크스페이스 이름은 4자 이상 10자 이하여야 합니다');
      onUrlGenerated('');
      return;
    }

    const firstChar = name[0];

    if (/[0-9]/.test(firstChar)) {
      setError('워크스페이스 이름은 숫자로 시작할 수 없습니다');
      onUrlGenerated('');
      return;
    }

    if (/[^a-zA-Z0-9]/.test(firstChar)) {
      setError('워크스페이스 이름은 특수문자로 시작할 수 없습니다');
      onUrlGenerated('');
      return;
    }

    if (!/^[a-z]/.test(firstChar)) {
      setError('워크스페이스 이름은 소문자로 시작해야 합니다');
      onUrlGenerated('');
      return;
    }

    if (!/^[a-z0-9]+$/.test(name)) {
      setError('워크스페이스 이름은 영문 소문자와 숫자만 사용할 수 있습니다');
      onUrlGenerated('');
      return;
    }

    try {
      setError('');
      const response = await fetch(`/api/workspace/check?name=${name}`);
      const data = await response.json();

      if (data.exists) {
        setError('이미 존재하는 워크스페이스 이름입니다');
        onUrlGenerated('');
      } else {
        const url = `https://veco-eight.vercel.app/${name}`;
        onUrlGenerated(url);
      }
    } catch {
      setError('서버 요청 중 오류가 발생했습니다');
    }
  };

  return (
    <div className="w-full">
      {/* 입력창 + 버튼 */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="워크스페이스 이름"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className={`w-full h-[6.2rem] rounded-[0.5rem] bg-gray-200 px-[2rem] font-body-r text-gray-400 focus:outline-none ${
            error ? 'border border-[#D44242]' : ''
          }`}
        />
        <button
          type="button"
          onClick={handleCheck}
          className="absolute right-[2rem] top-1/2 -translate-y-1/2 flex w-[4rem] h-[3.6rem] rounded-[0.6rem] bg-primary-blue items-center justify-center"
        >
          <img src={whitecheck} alt="Check" className="w-[1.6rem] h-[1.6rem]" />
        </button>
        {/* 에러 메시지 */}
        <p
          className={`absolute bottom-[-1.6rem] font-xsmall-r ${error ? 'text-[#D44242]' : 'text-transparent'}`}
        >
          {error || '입력 정보를 다시 확인하세요'}
        </p>
      </div>
    </div>
  );
};

export default WorkspaceNameInput;
