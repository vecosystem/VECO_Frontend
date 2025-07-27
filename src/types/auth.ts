import type { CommonResponse } from './common';

// 토큰 재발급
export type ReIssueTokenResponse = CommonResponse<{
  accessToken: string;
} | null>;
