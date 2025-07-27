/**
 * CommentInput.tsx
 * 상세페이지 댓글창) 댓글 입력창 컴포넌트
 *
 * @todo
 */

import CommentCompletionButton from './CommentCompletionButton';

const CommentInput = () => {
  return (
    <div>
      {/* 댓글 입력창 영역 */}
      <textarea></textarea>
      {/* 댓글 작성 완료 버튼 */}
      <CommentCompletionButton />
    </div>
  );
};

export default CommentInput;
