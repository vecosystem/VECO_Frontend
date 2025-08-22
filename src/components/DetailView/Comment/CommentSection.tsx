// CommentSection.tsx
// 상세페이지 댓글창) 댓글 전체 영역 컴포넌트

import { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import { useGetCommentList } from '../../../apis/comment/useGetCommentList';
import type { Comment } from '../../../types/comment';
import { useCommentTarget } from './hooks/useCommentTarget';
import LoadingSpinner from '../../LoadingSpinner';

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]); // comments라는 상태를 배열로 관리
  const { category, targetId, enabled } = useCommentTarget();
  const {
    data: commentList,
    isLoading,
    isPending,
    isError,
  } = useGetCommentList(targetId ?? 0, category ?? 'GOAL', enabled);

  useEffect(() => {
    console.log('commentList', commentList);
    setComments(commentList?.info ?? []);
  }, [commentList]);

  return (
    <div className="flex flex-col flex-1 gap-[3.2rem] w-full min-h-max">
      {/* 댓글 목록 헤더 */}
      <div className="flex gap-[0.8rem]">
        <div className="font-title-sub-r text-gray-600">댓글</div>
        {/* 댓글 개수를 숫자로 렌더링 */}
        <div className="font-title-sub-r text-gray-500">{comments.length}</div>
      </div>

      <div className="flex flex-col flex-1 w-full min-h-max gap-[1.6rem]">
        {/* 댓글 목록 */}
        {isLoading || isPending ? (
          <div className="flex items-center justify-center w-full">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center w-full">
            <div className="font-body-r text-gray-600">댓글을 조회할 수 없습니다.</div>
          </div>
        ) : comments.length === 0 ? (
          // 댓글 개수가 0개일 때: 댓글 목록의 초기 문구를 띄우도록
          <div className="flex items-center justify-center w-full">
            <div className="font-body-r text-gray-600">댓글을 작성하세요.</div>
          </div>
        ) : (
          // 댓글이 있을 때: 댓글 목록 렌더링
          <>
            {/* 댓글을 순서대로 목록에 추가 */}
            <div className="relative flex flex-col gap-y-[2.4rem] w-full">
              {comments.map(({ id, profileUrl, name, createdAt, content }) => (
                <CommentItem
                  key={id}
                  id={id}
                  profileUrl={profileUrl}
                  name={name}
                  createdAt={createdAt}
                  content={content}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
