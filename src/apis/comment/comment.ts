import { axiosInstance } from '../axios';
import type { PostCommentRequest } from '../../types/comment';

export const postComment = async (comment: PostCommentRequest): Promise<number> => {
  const response = await axiosInstance.post('/api/comments', comment);
  return response.data.result;
};
