import { useState } from 'react';
import whitecheck from '../../assets/icons/whitecheck.svg';

// 부모 컴포넌트에서 전달되는 props 타입 정의
interface WorkspaceNameInputProps {
  onUrlGenerated: (url: string) => void; // 생성된 URL을 상위 컴포넌트에 전달
}

// 워크스페이스 이름 입력 및 URL 생성 컴포넌트
const WorkspaceNameInput = ({ onUrlGenerated }: WorkspaceNameInputProps) => {
  const [workspaceName, setWorkspaceName] = useState(''); // 사용자가 입력한 워크스페이스 이름
  const [workspaceUrl, setWorkspaceUrl] = useState(''); // 백엔드에서 생성된 URL
  const [error, setError] = useState(''); // 유효성 검사 또는 서버 에러 메시지

  // 체크 버튼 클릭 시 호출되는 함수 (유효성 검사 + 중복 확인 + URL 생성)
  const handleCheck = async () => {
    const name = workspaceName.trim(); // 앞뒤 공백 제거

    // 이름 길이 검사
    if (name.length < 4 || name.length > 10) {
      setError('워크스페이스 이름은 4자 이상 10자 이하여야 합니다.');
      setWorkspaceUrl('');
      onUrlGenerated('');
      return;
    }

    const firstChar = name[0];

    // 첫 글자 유효성 검사
    if (/[0-9]/.test(firstChar)) {
      setError('워크스페이스 이름은 숫자로 시작할 수 없습니다.');
      setWorkspaceUrl('');
      onUrlGenerated('');
      return;
    }

    if (/[^a-zA-Z0-9]/.test(firstChar)) {
      setError('워크스페이스 이름은 특수문자로 시작할 수 없습니다.');
      setWorkspaceUrl('');
      onUrlGenerated('');
      return;
    }

    if (!/^[a-z]/.test(firstChar)) {
      setError('워크스페이스 이름은 소문자로 시작해야 합니다.');
      setWorkspaceUrl('');
      onUrlGenerated('');
      return;
    }

    // 전체 문자열 유효성 검사
    if (!/^[a-z0-9]+$/.test(name)) {
      setError('워크스페이스 이름은 영문 소문자와 숫자만 사용할 수 있습니다.');
      setWorkspaceUrl('');
      onUrlGenerated('');
      return;
    }

    // 백엔드로 중복 체크 및 URL 생성 요청
    try {
      setError(''); // 에러 초기화

      const response = await fetch(`/api/workspace/check?name=${name}`);
      const data = await response.json();

      if (data.exists) {
        // 이미 존재하는 이름일 경우
        setError('이미 존재하는 워크스페이스 이름입니다.');
        setWorkspaceUrl('');
        onUrlGenerated('');
      } else if (data.url) {
        // 백엔드에서 생성된 URL을 받아 저장 및 상위로 전달
        setWorkspaceUrl(data.url);
        onUrlGenerated(data.url);
      } else {
        // URL이 정상적으로 생성되지 않았을 경우
        setError('워크스페이스 URL을 생성하지 못했습니다.');
        setWorkspaceUrl('');
        onUrlGenerated('');
      }
    } catch {
      // 서버 요청 실패 시
      setError('서버 요청 중 오류가 발생했습니다.');
      setWorkspaceUrl('');
      onUrlGenerated('');
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-[4.6rem] relative">
      {/* --- 워크스페이스 이름 입력창 + 체크 버튼 --- */}
      <div className="relative w-full h-[6.2rem]">
        <div
          className={`flex items-center justify-between h-full w-full rounded-[0.5rem] px-[2rem] ${
            error ? 'border border-[#D44242]' : 'bg-gray-200'
          }`}
        >
          {/* 워크스페이스 이름 입력 필드 */}
          <input
            type="text"
            placeholder="워크스페이스 이름"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full bg-transparent font-body-r text-gray-400 focus:outline-none"
          />

          {/* 오른쪽 체크 버튼 */}
          <button
            type="button"
            onClick={handleCheck}
            className="w-[3.6rem] h-[3.6rem] flex items-center justify-center rounded-[0.6rem] bg-primary-blue ml-[1.3rem] shrink-0"
          >
            <img src={whitecheck} alt="Check" className="w-[1.6rem] h-[1.6rem]" />
          </button>
        </div>

        {/* 에러 메시지 (입력창 아래에 고정, 조건부 빨간색) */}
        <p
          className={`absolute mt-[1rem] font-xsmall-r ${
            error ? 'text-[#D44242]' : 'text-transparent'
          }`}
        >
          {error || '입력 정보를 다시 확인하세요'}
        </p>
      </div>

      {/* 워크스페이스 URL 표시 (readOnly) */}
      <input
        type="text"
        placeholder="워크스페이스 URL"
        value={workspaceUrl}
        readOnly
        className="w-full h-[6.2rem] rounded-[0.5rem] bg-gray-200 px-[2rem] font-body-r text-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default WorkspaceNameInput;
