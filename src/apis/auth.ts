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
