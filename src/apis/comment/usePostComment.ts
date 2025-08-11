import { axiosInstance } from '../axios';
import type { PostCommentRequest } from '../../types/comment';
import { useMutation } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { useCommentTarget } from '../../components/DetailView/Comment/hooks/useCommentTarget';

export const postComment = async ({
  content,
  category,
  targetId,
}: PostCommentRequest): Promise<number> => {
  const response = await axiosInstance.post('/api/comments', { content, category, targetId });
  return response.data.result;
};

type UsePostCommentOptions = {
  bottomRef: React.RefObject<HTMLDivElement | null>;
  shouldScrollRef?: React.RefObject<boolean>; // ← 옵션: 댓글 추가시에만 스크롤
  useDoubleRaf?: boolean; // 기본 true
};

export const usePostComment = ({
  bottomRef,
  shouldScrollRef,
  useDoubleRaf = true,
}: UsePostCommentOptions) => {
  const queryClient = useQueryClient();
  const { category, targetId } = useCommentTarget();

  // 프레임 1~2회 대기 유틸 (rAF 기반)
  const waitNextPaint = () =>
    new Promise<void>((resolve) =>
      requestAnimationFrame(() => {
        if (useDoubleRaf) {
          requestAnimationFrame(() => resolve());
        } else {
          resolve();
        }
      })
    );

  return useMutation({
    mutationFn: async (content: string) => {
      // 여기서 category/targetId 조합
      return postComment({ content, category: category!, targetId: targetId! });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKey.COMMENT_LIST, targetId!, category!],
        refetchType: 'active',
      });
      // “사용자 액션 후에만” 스크롤 (초기 진입 차단)
      if (shouldScrollRef && !shouldScrollRef.current) return;

      // 렌더/레이아웃 안정까지 대기 후 스크롤
      await waitNextPaint();
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

      // 한 번만 동작하도록 리셋
      if (shouldScrollRef) shouldScrollRef.current = false;
    },
    onError: (error) => {
      // 실패 시에도 플래그 원복(다음 시도에 영향 없게)
      if (shouldScrollRef) shouldScrollRef.current = false;
      console.error(error);
    },
  });
};
