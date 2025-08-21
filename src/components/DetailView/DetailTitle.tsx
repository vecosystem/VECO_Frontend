// DetailTitle.tsx
// 상세페이지 제목 컴포넌트

import { useEffect, useRef } from 'react';
import { useToast } from '../Toast/ToastProvider';

interface DetailTitleProps {
  defaultTitle: string;
  title: string;
  setTitle: (value: string) => void;
  isEditable: boolean; // true일 때만 상세 설명 내용 입력 가능함
}

const MAX_TITLE = 20; // 최대 제목 글자 수

const DetailTitle = ({ defaultTitle, title, setTitle, isEditable }: DetailTitleProps) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const committedLenRef = useRef(title.length); // 마지막으로 커밋된(클램프 반영된) 길이
  const warnedRef = useRef(false); // 이번 글자수 초과 구간에서 토스트를 이미 띄웠는지 확인
  const composingRef = useRef(false); // 입력 방식 편집기(IME) 사용 중인지
  const { showToast } = useToast();

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; // height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px'; // 내용만큼 높이를 재조절
    }
  };

  const clamp = (s: string) => (s.length > MAX_TITLE ? s.slice(0, MAX_TITLE) : s);

  // 길이 상태 평가 + (필요 시) 토스트 1회
  const evaluateLimitAndMaybeToast = (nextRaw: string) => {
    const isOver = nextRaw.length > MAX_TITLE;
    const wasUnderOrEqual = committedLenRef.current <= MAX_TITLE;

    // 20자 이하로 돌아오면 다음 초과 때 다시 토스트 허용
    if (!isOver) warnedRef.current = false;

    if (wasUnderOrEqual && isOver && !warnedRef.current) {
      showToast({
        contents: '최대 20자까지 작성할 수 있습니다.',
        key: 'titleMax', // 중복 합치기
      });
      warnedRef.current = true;
    }
  };

  // onChange: 모든 입력 변경(키보드, 붙여넣기, 마우스 등)에서 호출됨
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextRaw = e.target.value;

    // IME 조합 중에는 토스트/클램프를 지연하고, 조합 종료에서 한 번에 처리
    if (composingRef.current) {
      setTitle(nextRaw);
      handleResizeHeight();
      return;
    }

    // 조합이 아니면 즉시 검사 및 토스트
    evaluateLimitAndMaybeToast(nextRaw);

    // 조합이 아니면 즉시 평가 -> 토스트 -> 클램프 -> 커밋
    evaluateLimitAndMaybeToast(nextRaw);
    const next = clamp(nextRaw);
    setTitle(next);
    committedLenRef.current = next.length;
    handleResizeHeight();
  };

  // IME 조합 시작/종료
  const handleCompositionStart = () => {
    composingRef.current = true;
  };
  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    composingRef.current = false;
    const nextRaw = e.currentTarget.value;

    // 조합 종료 시 한 번만 평가 -> 토스트 -> 클램프 -> 커밋
    evaluateLimitAndMaybeToast(nextRaw);
    const next = clamp(nextRaw);
    setTitle(next);
    committedLenRef.current = next.length;
    handleResizeHeight();
  };

  useEffect(() => {
    handleResizeHeight();
  }, [title]);

  useEffect(() => {
    const r = () => handleResizeHeight();
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  return (
    <textarea
      name="detailTitle"
      id="detailTitle"
      ref={textarea}
      value={title}
      rows={1}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // 엔터 키를 눌러 직접 줄바꿈하는 것 방지
        }
      }}
      disabled={!isEditable}
      // 각 페이지별 placeholder를 서로 다르게 할 수 있도록 defaultTitle로 처리
      placeholder={defaultTitle}
      className="w-full font-bigtitle-b placeholder-gray-400 text-gray-600 focus:outline-none resize-none overflow-hidden"
    ></textarea>
  );
};

export default DetailTitle;
