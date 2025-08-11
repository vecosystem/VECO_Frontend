import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export type CategoryType = 'ISSUE' | 'GOAL' | 'EXTERNAL';

type UseCommentTargetResult = {
  category: CategoryType | null;
  targetId: number | null;
  enabled: boolean; // react-query enabled에 바로 사용
};

export function useCommentTarget(): UseCommentTargetResult {
  const { pathname } = useLocation();
  const params = useParams();

  // 1) 경로로 카테고리 판단
  const category: CategoryType | null = useMemo(() => {
    if (pathname.includes('/issue/')) return 'ISSUE';
    if (pathname.includes('/goal/')) return 'GOAL';
    if (pathname.includes('/ext/')) return 'EXTERNAL';
    return null;
  }, [pathname]);

  // 2) 파라미터에서 id 추출 (각 라우트에 맞춰 우선순위 검사)
  const targetId = useMemo(() => {
    const raw = params.issueId ?? params.goalId ?? params.extId ?? null;
    const num = raw ? Number(raw) : NaN;
    return Number.isFinite(num) ? num : null;
  }, [params.issueId, params.goalId, params.extId]);

  // 3) create 페이지 등 id가 없을 수 있으니 enabled 분기
  const enabled = !!category && Number.isFinite(targetId as number);

  return { category, targetId, enabled };
}
