export type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  hasNext: boolean;
  nextCursor: string | null;
  pageSize: number;
}>;
