import { axiosInstance } from './axios';
import type { ReIssueTokenResponse } from '../types/auth';

/**
 * accessToken 재발급 요청 함수
 * - pages/onboarding/GoogleLoginRedirect.tsx
 */
export const postReIssueAccessToken = async (): Promise<string> => {
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
 * - components/Onboarding/SocialLoginButton.tsx
 */
export const redirectToGoogleLogin = () => {
  const baseURL = import.meta.env.VITE_SERVER_API_URL;
  if (!baseURL) {
    console.error('서버 주소가 정의되지 않았습니다.');
    alert('서버 연결에 문제가 있어 Google 로그인을 진행할 수 없습니다.');
    return;
  }

  try {
    window.location.href = `${baseURL}/oauth2/authorization/google/google`;
  } catch (error) {
    console.error('Google 로그인 리다이렉트 실패:', error);
    alert('Google 로그인 중 문제가 발생했습니다.');
  }
};

/**
 * Kakao OAuth2 로그인 URL로 리다이렉트
 * - 명세서 X, 임시 구조
 * - components/Onboarding/SocialLoginButton.tsx
 */
export const redirectToKakaoLogin = () => {
  const baseURL = import.meta.env.VITE_SERVER_API_URL;
  if (!baseURL) {
    console.error('서버 주소가 정의되지 않았습니다.');
    alert('서버 연결에 문제가 있어 Kakao 로그인을 진행할 수 없습니다.');
    return;
  }

  try {
    window.location.href = `${baseURL}/oauth2/authorization/kakao`;
  } catch (error) {
    console.error('Kakao 로그인 리다이렉트 실패:', error);
    alert('Kakao 로그인 중 문제가 발생했습니다.');
  }
};
