// CommentInput.tsx
// 상세페이지 댓글창) 댓글 입력창 컴포넌트

import { useState } from 'react';
import CommentCompletionButton from './CommentCompletionButton';

const CommentInput = () => {
  const [comment, setComment] = useState('');

  // 입력 시
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div
      className="flex flex-end items-end gap-[0.8rem] w-full h-[13rem] p-[2.4rem] bg-gray-100 rounded-lg"
      style={{
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 댓글 입력창 영역 */}
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="댓글을 작성하세요."
        className="w-full h-full font-body-r placeholder-gray-400 text-gray-600 focus:outline-none resize-none basic-scroll"
      ></textarea>
      {/* 댓글 작성 완료 버튼 */}
      <CommentCompletionButton
        isCommentFilled={comment.trim().length > 0}
        onClick={() => {
          // 댓글 전송 로직
          setComment('');
        }}
      />
    </div>
  );
};

export default CommentInput;
