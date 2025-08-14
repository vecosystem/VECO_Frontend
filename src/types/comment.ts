export type CategoryType = 'ISSUE' | 'GOAL' | 'EXTERNAL';

// 개별 댓글
export type Comment = {
  id: string;
  profileUrl: string;
  nickname: string;
  createdAt: string; // ISO datetime string
  content: string;
};

//댓글 리스트
export type ResponseCommentListDto = {
  cnt: number;
  info: Comment[];
};

export type PostCommentRequest = {
  content: string;
  category: CategoryType;
  targetId: number;
};
