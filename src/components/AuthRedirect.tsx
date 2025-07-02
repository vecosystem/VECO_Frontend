/**
 * AuthRedirect 컴포넌트
 *
 * 로그인 후 워크스페이스 내에 진입하면 제일 먼저 AuthRedirect가 실행되어 로그인 여부를 확인한다.
 * - 로그인하지 않은 경우: /onboarding 페이지로 리다이렉트. (publicRoutes)
 * - 로그인한 경우: /team/:teamId/issue 페이지로 리다이렉트. (protectedRoutes)
 *
 * @remarks
 * 이 주석은 해당 컴포넌트 코드 작성을 돕기 위한 목적으로, 코드 작성 완료 시 제거해도 됩니다.
 */
