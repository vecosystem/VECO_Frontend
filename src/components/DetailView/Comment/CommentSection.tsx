/**
 * CommentSection.tsx
 * 상세페이지 댓글창) 댓글 전체 영역 컴포넌트
 *
 * @todo
 * - 댓글 목록의 초기 상태: "댓글을 작성하세요."
 * - 일정 영역보다 댓글 목록이 길어지면 스크롤바 생기도록
 * - 스크롤하여 댓글 목록 끝까지 내리면 그라데이션 뜨도록
 * - 댓글 수: 입력된 댓글 수에 따라 헤더에 댓글 숫자 뜨도록
 */

import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-[3.2rem] w-full h-[41rem]">
      {/* 댓글 목록 헤더 */}
      <div className="flex gap-[0.8rem]">
        <div className="font-title-sub-r text-gray-600">댓글</div>
        <div className="font-title-sub-r text-gray-500">0</div>
      </div>

      {/* 댓글 영역 */}
      <div className="relative flex flex-col gap-[3.2rem] w-full">
        {/* 댓글 입력창: 댓글 목록 위에 겹쳐지게 위치 */}
        <CommentInput />

        {/* 댓글 목록 */}
        <div className="w-full h-[35rem]">
          {/* 개별 댓글 */}
          <CommentItem />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
