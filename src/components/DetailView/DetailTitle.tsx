/**
 * DetailTitle.tsx
 * 상세페이지 제목 컴포넌트
 *
 * @todo
 * - 최대20자, 20자 넘길 경우 토스트 뜨게 해야 함
 * - 제목 0자 작성 시 토스트 뜨게 해야 함
 */

import { useEffect, useRef } from 'react';

interface DetailTitleProps {
  defaultTitle: string;
  title: string;
  setTitle: (value: string) => void;

  isEditable: boolean; // true일 때만 상세 설명 내용 입력 가능함
}

const DetailTitle = ({ defaultTitle, title, setTitle, isEditable }: DetailTitleProps) => {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; // height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px'; // 내용만큼 높이를 재조절
    }
  };

  // 입력 시
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    handleResizeHeight();
  };

  // 초기 mount 및 title 업데이트 시 제목 textarea 높이 조절되게
  useEffect(() => {
    handleResizeHeight();
  }, [title]);

  // 뷰포트 사이즈 변경 시에도 제목 textarea 높이 재조정
  useEffect(() => {
    window.addEventListener('resize', handleResizeHeight);
    return () => {
      window.removeEventListener('resize', handleResizeHeight);
    };
  }, []);

  return (
    <textarea
      ref={textarea}
      value={title}
      rows={1}
      onChange={handleChange}
      disabled={!isEditable}
      // 각 페이지별 placeholder를 서로 다르게 할 수 있도록 defaultTitle로 처리
      placeholder={defaultTitle}
      className="w-full font-bigtitle-b placeholder-gray-400 text-gray-600 focus:outline-none resize-none overflow-hidden break-keep ${!isEditable ? '' : 'cursor-not-allowed'}"
    ></textarea>
  );
};

export default DetailTitle;
