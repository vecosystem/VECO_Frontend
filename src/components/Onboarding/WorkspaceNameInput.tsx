import { useState } from 'react';
import whitecheck from '../../assets/icons/whitecheck.svg';
import { validateWorkspaceName } from '../../utils/validateWorkspaceName.ts';
import { usePostCreateWorkspaceUrl } from '../../apis/workspace/usePostCreateWorkspaceUrl.ts';

// 부모 컴포넌트에서 전달되는 props 타입 정의
interface WorkspaceNameInputProps {
  onUrlGenerated: (url: string) => void; // 생성된 URL을 상위 컴포넌트에 전달
}

// 워크스페이스 이름 입력 및 URL 생성 컴포넌트
const WorkspaceNameInput = ({ onUrlGenerated }: WorkspaceNameInputProps) => {
  const [workspaceName, setWorkspaceName] = useState(''); // 사용자가 입력한 워크스페이스 이름
  const [workspaceUrl, setWorkspaceUrl] = useState(''); // 백엔드에서 생성된 URL
  const [error, setError] = useState(''); // 유효성 검사 또는 서버 에러 메시지

  // react-query mutation 훅 사용
  const { mutateAsync: createUrl } = usePostCreateWorkspaceUrl();

  const handleCheck = async () => {
    // 입력값 유효성 검사
    const validationError = validateWorkspaceName(workspaceName);
    if (validationError) {
      setError(validationError);
      setWorkspaceUrl('');
      onUrlGenerated('');
      return;
    }

    // 서버 요청
    const res = await createUrl({ workspaceName });

    // workspaceUrl 추출
    const url = res.result?.workspaceUrl ?? '';

    // 에러 초기화 및 상태 업데이트
    setError('');
    setWorkspaceUrl(url);
    onUrlGenerated(url);
  };

  return (
    <div className="w-full flex flex-col items-center gap-[4.6rem] relative">
      {/* 워크스페이스 이름 입력창 */}
      <div className="relative w-full h-[6.2rem]">
        <div
          className={`flex items-center justify-between h-full w-full rounded-[0.5rem] px-[2rem] ${
            error ? 'border border-error-400' : 'bg-gray-200'
          }`}
        >
          {/* 워크스페이스 이름 입력 필드 */}
          <input
            type="text"
            placeholder="워크스페이스 이름"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className={`w-full bg-transparent font-body-r focus:outline-none placeholder-text-gray-400 ${
              workspaceUrl && !error ? 'text-gray-600' : 'text-gray-400'
            }`}
          />

          {/* 오른쪽 체크 버튼 */}
          <button
            type="button"
            onClick={handleCheck}
            className="w-[4rem] h-[3.6rem] flex items-center justify-center rounded-[0.6rem] bg-primary-blue ml-[1.3rem] shrink-0"
          >
            <img src={whitecheck} alt="Check" className="w-[1.6rem] h-[1.6rem]" />
          </button>
        </div>

        {/* 에러 메시지 (입력창 아래에 고정, 조건부 빨간색) */}
        <p
          className={`absolute mt-[1rem] font-xsmall-r ${error ? 'text-error-400' : 'text-transparent'}`}
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
