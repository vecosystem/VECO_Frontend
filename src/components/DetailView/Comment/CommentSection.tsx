// CommentSection.tsx
// 상세페이지 댓글창) 댓글 전체 영역 컴포넌트

import { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useGetCommentList } from '../../../apis/comment/useGetCommentList';
import type { Comment } from '../../../types/comment';
import { postComment } from '../../../apis/comment/comment';
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../../../constants/queryKey';
import { useCommentTarget } from './hooks/useCommentTarget';

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]); // comments라는 상태를 배열로 관리
  const queryClient = useQueryClient();
  const { category, targetId, enabled } = useCommentTarget();
  const { data: commentList } = useGetCommentList(targetId ?? 0, category ?? 'GOAL');

  useEffect(() => {
    setComments(commentList?.comments ?? []);
  }, [commentList]);

  const handleAddComment = async (content: string) => {
    if (!enabled) return;
    try {
      await postComment({ content, category: category!, targetId: targetId! });
      // 댓글 작성 후 캐시 무효화 → 목록 재요청
      queryClient.invalidateQueries({
        queryKey: [queryKey.COMMENT_LIST, targetId!, category!],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-[3.2rem] w-full min-h-max mb-[5.3rem]">
      {/* 댓글 목록 헤더 */}
      <div className="flex gap-[0.8rem]">
        <div className="font-title-sub-r text-gray-600">댓글</div>
        {/* 댓글 개수를 숫자로 렌더링 */}
        <div className="font-title-sub-r text-gray-500">{comments.length}</div>
      </div>

      <div className="flex flex-col flex-1 w-full min-h-max gap-[1.6rem]">
        {/* 댓글 목록 */}
        {comments.length === 0 ? (
          // 댓글 개수가 0개일 때: 댓글 목록의 초기 문구를 띄우도록
          <div className="flex items-center justify-center w-full">
            <div className="font-body-r text-gray-600">댓글을 작성하세요.</div>
          </div>
        ) : (
          // 댓글이 있을 때: 댓글 목록 렌더링
          <>
            {/* 댓글을 순서대로 목록에 추가 */}
            <div className="relative flex flex-col gap-y-[2.4rem] w-full">
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
    </div>
  );
};

export default CommentSection;
