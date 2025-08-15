export type CategoryType = 'ISSUE' | 'GOAL' | 'EXTERNAL';

export type Author = {
  authorId: number;
  authorName: string;
  profileImageUrl: string;
};

export type Comment = {
  commentId: number;
  content: string;
  createdAt: Date;
  author: Author;
};

export type CommentListResponse = {
  totalSize: number;
  comments: Comment[];
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
