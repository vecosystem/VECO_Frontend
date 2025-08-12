// CommentInput.tsx
// 상세페이지 댓글창) 댓글 입력창 컴포넌트

import { useState } from 'react';
import CommentCompletionButton from './CommentCompletionButton';

interface CommentIntputProps {
  onAdd: (content: string) => void;
}

const CommentInput = ({ onAdd }: CommentIntputProps) => {
  const [comment, setComment] = useState('');

  // 입력 시
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim().length === 0) return;
    onAdd(comment.trim());
    setComment('');
  };

  return (
    <div
      className="w-full flex items-end gap-[0.8rem] h-[13rem] p-[2.4rem] bg-gray-100 rounded-lg"
      style={{
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 댓글 입력창 영역 */}
      <textarea
        name="commentInput"
        id="commentInput"
        value={comment}
        onChange={handleChange}
        placeholder="댓글을 작성하세요."
        className="w-full h-full font-body-r placeholder-gray-400 text-gray-600 focus:outline-none resize-none basic-scroll"
      ></textarea>
      {/* 댓글 작성 완료 버튼 */}
      <CommentCompletionButton isCommentFilled={comment.trim().length > 0} onClick={handleSubmit} />
    </div>
  );
};

export default CommentInput;
