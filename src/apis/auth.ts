import { axiosInstance } from './axios';
import type { ReIssueTokenResponse } from '../types/auth';

/**
 * accessToken 재발급 요청 함수
 */
export const reissueAccessToken = async (): Promise<string> => {
  const { data }: { data: ReIssueTokenResponse } = await axiosInstance.post(
    '/api/token/reissue',
    null,
    {
      withCredentials: true, // 쿠키 포함 (refreshToken 전송)
    }
  );

  if (!data.result?.accessToken) {
    throw new Error('accessToken 재발급 실패');
  }

  return data.result.accessToken;
};

/**
 * Google OAuth2 로그인 URL로 리다이렉트
 */
export const redirectToGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/oauth2/authorization/google`;
};

/**
 * Kakao OAuth2 로그인 URL로 리다이렉트
 * - 명세서 X, 임시 구조
 */
export const redirectToKakaoLogin = () => {
  window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/oauth2/authorization/kakao`;
};
