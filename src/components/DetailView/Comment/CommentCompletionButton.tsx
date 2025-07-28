// CommentCompletionButton.tsx
// 상세페이지 댓글창) 댓글 입력 확인 버튼 컴포넌트

interface CommentCompletionButtonProps {
  isCommentFilled: boolean; // 댓글이 입력되었는지를 따지는 플래그
  onClick?: () => void;
}

const CommentCompletionButton = ({ isCommentFilled, onClick }: CommentCompletionButtonProps) => {
  // 댓글이 입력되지 않으면: 버튼 비활성화
  const isDisabled = !isCommentFilled;

  // 버튼 비활성화 상태일 때 or 활성화 상태일 때의 스타일링 구분
  const cursorClass = isDisabled ? '' : 'cursor-pointer';
  const bgColor = isDisabled ? 'bg-gray-200' : 'bg-primary-blue';
  const textColor = isDisabled ? 'text-gray-400' : 'text-gray-100';

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`flex items-center justify-center px-[1.6rem] py-[0.8rem] font-small-b whitespace-nowrap rounded-md ${cursorClass} ${bgColor} ${textColor} transition-colors duration-300 ease-in-out`}
    >
      확인
    </button>
  );
};

export default CommentCompletionButton;
