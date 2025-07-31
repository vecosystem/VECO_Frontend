// CommentItem.tsx
// 상세페이지 댓글창) 개별 댓글 컴포넌트

import IcDummyProfile from '../../../assets/icons/gray-lg.svg';

interface CommentItemProps {
  author: string; // 댓글 작성자
  content: string; // 댓글 내용
  createAt: Date; // 댓글 작성 날짜
}

const CommentItem = ({ author, content, createAt }: CommentItemProps) => {
  return (
    <div className="flex items-start gap-[1.6rem] w-full">
      {/* 댓글 작성자 프로필: 현재는 더미이미지 삽입. 추후 데이터 받아와 연동 예정 */}
      <img src={IcDummyProfile} alt="작성자 프로필" />

      <div className="flex flex-col gap-[0.8rem]">
        {/* 작성자 정보 */}
        <div className="flex items-center gap-[0.8rem]">
          {/* 작성자 이름 */}
          <span className="font-body-b text-gray-600">{author}</span>
          {/* 작성 시간 */}
          <span className="font-small-r text-gray-500">{createAt.toLocaleString()}</span>
        </div>

        {/* 댓글 내용 */}
        <div className="font-body-r text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default CommentItem;
