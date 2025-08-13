import { axiosInstance } from '../axios';
import type { CommentListResponse } from '../../types/comment';
import type { CategoryType } from '../../types/comment';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

// 댓글 조회
export const getCommentList = async (
  targetId: number,
  category: CategoryType
): Promise<CommentListResponse> => {
  try {
    const response = await axiosInstance.get('/api/comments', {
      params: {
        targetId,
        category,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error('댓글 조회 실패', error);
    throw error;
  }
};

export const useGetCommentList = (targetId: number, category: CategoryType) => {
  return useQuery({
    queryKey: [queryKey.COMMENT_LIST, {targetId, category}],
    queryFn: () => getCommentList(targetId, category),
  });
};
