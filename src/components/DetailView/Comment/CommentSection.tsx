// CommentSection.tsx
// 상세페이지 댓글창) 댓글 전체 영역 컴포넌트

import { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useGetCommentList } from '../../../apis/comment/useGetCommentList';
import type { Comment } from '../../../types/comment';

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]); // comments라는 상태를 배열로 관리
  const { data: commentList } = useGetCommentList(1, 'GOAL');

  useEffect(() => {
    console.log(commentList);
    setComments(commentList?.comments ?? []);
  }, [commentList]);

  // const handleAddComment = (content: string) => {
  //   const newComment: Comment = {

  //   };
  //   setComments((prev) => [...prev, newComment]);
  // };

  return (
    <div className="relative flex flex-col flex-1 gap-[3.2rem] w-full min-h-0">
      {/* 댓글 목록 헤더 */}
      <div className="flex gap-[0.8rem]">
        <div className="font-title-sub-r text-gray-600">댓글</div>
        {/* 댓글 개수를 숫자로 렌더링 */}
        <div className="font-title-sub-r text-gray-500">{comments.length}</div>
      </div>

      <div className="flex flex-col w-full max-h-full overflow-y-auto basic-scroll">
        {/* 댓글 목록 */}
        {comments.length === 0 ? (
          // 댓글 개수가 0개일 때: 댓글 목록의 초기 문구를 띄우도록
          <div className="flex items-center justify-center w-full">
            <div className="font-body-r text-gray-600">댓글을 작성하세요.</div>
          </div>
        ) : (
          // 댓글이 있을 때: 댓글 목록 렌더링
          <>
            <div className="absolute bottom-[14.6rem] w-full z-10 pr-[1.2rem]">
              {/* 댓글 목록 위에 옅은 흰색 그라디언트 처리 */}
              <div className="w-full h-[6.4rem] bg-gradient-to-b from-white/0 to-white pointer-events-none" />
            </div>
            {/* 댓글을 순서대로 목록에 추가 */}
            <div className="flex flex-col gap-y-[2.4rem] mb-[14.6rem] w-full overflow-y-scroll basic-scroll">
              {comments.map(({ commentId, author, content, createdAt }) => (
                <CommentItem
                  key={commentId}
                  commentId={commentId}
                  author={author}
                  content={content}
                  createdAt={createdAt}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 댓글 입력창 */}
      <CommentInput onAdd={() => {}} />
    </div>
  );
};

export default CommentSection;
