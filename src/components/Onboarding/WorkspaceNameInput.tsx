import { useState } from 'react';
import whitecheck from '../../assets/icons/whitecheck.svg';
import { validateWorkspaceName } from '../../utils/validateWorkspaceName.ts';
import { usePostCreateWorkspaceUrl } from '../../apis/workspace/usePostCreateWorkspaceUrl.ts';

interface WorkspaceNameInputProps {
  workspaceName: string;
  workspaceUrl: string;
  isLocked: boolean;
  setWorkspaceName: (url: string) => void;
  setWorkspaceUrl: (url: string) => void;
  setIsLocked: (v: boolean) => void;
}

// 워크스페이스 이름 입력 및 URL 생성 컴포넌트
const WorkspaceNameInput = ({
  workspaceName,
  workspaceUrl,
  isLocked,
  setWorkspaceName,
  setWorkspaceUrl,
  setIsLocked,
}: WorkspaceNameInputProps) => {
  const [error, setError] = useState('');
  const { mutateAsync: createUrl, isPending } = usePostCreateWorkspaceUrl();

  const handleCheck = async () => {
    // 1) 중복 회피: 요청 진행 중이거나, 이미 URL이 있거나, 잠겨 있으면 종료
    if (isPending || workspaceUrl || isLocked) return;

    // 2) 유효성 검증 실패 시 에러 표시 & 값 초기화
    const validationError = validateWorkspaceName(workspaceName);
    if (validationError) {
      setError(validationError);
      setWorkspaceName('');
      setWorkspaceUrl('');
      return;
    }

    // 3) 단일 실행: URL 생성 API 호출
    const res = await createUrl({ workspaceName });
    const url = res.result?.workspaceUrl ?? '';

    // 4) 성공 처리: 값 고정 + 잠금
    setError('');
    setWorkspaceName(workspaceName);
    setWorkspaceUrl(url);
    setIsLocked(true);
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
            readOnly={isLocked || !!workspaceUrl}
            className={`w-full bg-transparent font-body-r focus:outline-none placeholder-text-gray-400 ${
              workspaceUrl && !error ? 'text-gray-600' : 'text-gray-400'
            }`}
          />

          {/* 오른쪽 체크 버튼 */}
          <button
            type="button"
            onClick={handleCheck}
            disabled={isLocked || !!workspaceUrl}
            className="w-[4rem] h-[3.6rem] flex items-center justify-center rounded-[0.6rem] bg-primary-blue ml-[1.3rem] shrink-0 cursor-pointer"
          >
            <img src={whitecheck} alt="Check" className="w-[1.6rem] h-[1.6rem]" />
          </button>
        </div>

        {/* 에러 메시지 (입력창 아래에 고정, 조건부 빨간색) */}
        {error ? (
          <p
            className="absolute mt-[1rem] font-xsmall-r text-error-400"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        ) : (
          <div className="absolute mt-[1rem]" />
        )}
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
