/**
 * AuthRedirect 컴포넌트
 *
 * 로그인 후 워크스페이스 내에 진입하면 제일 먼저 AuthRedirect가 실행되어 로그인 여부를 확인한다.
 * - 로그인하지 않은 경우(publicRoutes): 온보딩 페이지로 리다이렉트.
 * - 로그인한 경우(protectedRoutes): 워크스페이스 진입, fefault로 설정된 팀의 이슈 페이지로 리다이렉트.
 *
 * @todo
 * - 인증 상태를 확인하는 로직 추가 (예: useAuth 훅 사용)
 * - 인증 상태에 따라 리다이렉트 처리 구현.
 *    - 인증되지 않은 경우: '/onboarding' 페이지로 리다이렉트.
 *    - 인증 확인되면: 워크스페이스 내 default 팀의 id를 받아와서, `/team/${defaultTeamId}/issue` 페이지로 리다이렉트.
 *
 * @remarks
 * 이 주석은 해당 컴포넌트 코드 작성을 돕기 위한 목적으로, 코드 작성 완료 시 제거해도 됩니다.
 */

export default function AuthRedirect() {
  return <div></div>;
}
