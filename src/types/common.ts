export type CommonResponse<T = null> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
};

export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  hasNext: boolean;
  nextCursor: string | null;
  pageSize: number;
}>;

export type PaginationDto = {
  cursor?: string;
  size?: number;
  query?: string;
};
