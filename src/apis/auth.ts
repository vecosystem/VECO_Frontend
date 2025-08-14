import { axiosInstance } from './axios';
import type { ReIssueTokenResponse } from '../types/auth';

/**
 * accessToken 재발급 요청 함수
 * - pages/onboarding/TokenLoading.tsx
 */
export const postReIssueAccessToken = async (): Promise<string> => {
  const { data }: { data: ReIssueTokenResponse } = await axiosInstance.post('/api/token/reissue');

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
    window.location.href = `${baseURL}/oauth2/authorization/google`;
  } catch (error) {
    console.error('Google 로그인 리다이렉트 실패:', error);
    alert('Google 로그인 중 문제가 발생했습니다.');
  }
};

/**
 * Kakao OAuth2 로그인 URL로 리다이렉트
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

// 설정 - 로그아웃
export const postLogout = async (): Promise<void> => {
  try {
    await axiosInstance.post('/api/token/logout');
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

// 설정 - 회원 탈퇴
export const deleteWithdraw = async () => {
  const res = await axiosInstance.delete('/api/workspace/setting/my-profile');
  return res;
};
