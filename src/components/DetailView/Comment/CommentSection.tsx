/**
 * CommentSection.tsx
 * 상세페이지 댓글창) 댓글 전체 영역 컴포넌트
 *
 * @todo
 * - 댓글 목록의 초기 상태: "댓글을 작성하세요."
 * - 일정 영역보다 댓글 목록이 길어지면 스크롤바 생기도록
 * - 스크롤하여 댓글 목록 끝까지 내리면 그라데이션 뜨도록
 */

import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const CommentSection = () => {
  return (
    <div>
      {/* 댓글 목록 헤더 */}
      <div>
        <div>댓글</div>
        {/* 댓글 수: 입력된 댓글 수에 따라 헤더에 댓글 숫자 뜨도록 구현 */}
        <div>0</div>
      </div>

      {/* 댓글 영역 */}
      <div>
        {/* 댓글 입력창: 댓글 목록 위에 겹쳐지게 위치 */}
        <CommentInput />

        {/* 댓글 목록 */}
        <div>
          {/* 개별 댓글 */}
          <CommentItem />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
