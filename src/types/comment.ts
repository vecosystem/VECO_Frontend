export type CategoryType = 'ISSUE' | 'GOAL' | 'EXTERNAL';

export type Comment = {
  id: number;
  profileUrl: string;
  name: string;
  createdAt: string;
  content: string;
};

export type PostCommentRequest = {
  content: string;
  category: CategoryType;
  targetId: number;
};

//댓글 리스트
export type ResponseCommentListDto = {
  cnt: number;
  info: Comment[];
};
