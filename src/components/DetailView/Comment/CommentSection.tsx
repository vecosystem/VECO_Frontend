// CommentSection.tsx
// 상세페이지 댓글창) 댓글 전체 영역 컴포넌트

import { useState } from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface Comment {
  author: string; // 댓글 작성자
  content: string; // 댓글 내용
  createAt: Date; // 댓글 작성 날짜
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]); // comments라는 상태를 배열로 관리

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      author: '전채운', // 추후 로그인 유저로 대체
      content,
      createAt: new Date(),
    };
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div className="flex flex-col gap-[3.2rem] w-full">
      {/* 댓글 목록 헤더 */}
      <div className="flex gap-[0.8rem]">
        <div className="font-title-sub-r text-gray-600">댓글</div>
        {/* 댓글 개수를 숫자로 렌더링 */}
        <div className="font-title-sub-r text-gray-500">{comments.length}</div>
      </div>

      <div className="flex flex-col gap-[1.6rem] w-full h-[35rem]">
        {/* 댓글 목록 */}
        <div className="flex flex-col gap-[2.4rem] w-full h-full overflow-y-auto basic-scroll">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              {/* 댓글 개수가 0개일 때: 댓글 목록의 초기 문구를 띄우도록 */}
              <div className="font-body-r text-gray-600">댓글을 작성하세요.</div>
            </div>
          ) : (
            comments.map(({ author, content, createAt }) => (
              <CommentItem author={author} content={content} createAt={createAt} />
            ))
          )}
        </div>

        {/* 댓글 입력창 */}
        <CommentInput onAdd={handleAddComment} />
      </div>
    </div>
  );
};

export default CommentSection;
