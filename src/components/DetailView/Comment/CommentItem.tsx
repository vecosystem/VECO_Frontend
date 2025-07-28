/**
 * CommentItem.tsx
 * 상세페이지 댓글창) 개별 댓글 컴포넌트
 *
 * @todo
 * - 버튼 누르면 이 아이템이 목록에 생성되게
 */

interface CommentItemProps {
  content: string;
  createAt: Date;
}

const CommentItem = ({ content, createAt }: CommentItemProps) => {
  return (
    <div className="flex gap-[1.6rem] w-full">
      {/* 댓글 작성자 프로필 */}
      <div></div>

      <div className="flex flex-col">
        {/* 작성자 정보 */}
        <div className="flex gap-[0.8rem]">
          {/* 작성자 이름 */}
          <span>전채운</span>
          {/* 작성 시간 */}
          <span>{createAt.toLocaleString()}</span>
        </div>

        {/* 댓글 내용 */}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default CommentItem;
