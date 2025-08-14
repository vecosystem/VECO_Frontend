import { useLocation, useParams } from 'react-router-dom';

type DetailType = 'goal' | 'issue' | 'ext';
type DetailMode = 'create' | 'edit' | 'view';

interface UseDetailModeResult {
  type: DetailType;
  mode: DetailMode;
  id: number | null;
}

export const useDetailMode = (): UseDetailModeResult => {
  const location = useLocation();
  const { goalId, issueId, extId } = useParams();
  const pathname = location.pathname;

  const type: DetailType = pathname.includes('/goal/')
    ? 'goal'
    : pathname.includes('/issue/')
      ? 'issue'
      : 'ext';

  // path 기준으로 명확하게 구분
  const mode: DetailMode = pathname.endsWith('/create')
    ? 'create'
    : pathname.endsWith('/edit')
      ? 'edit'
      : 'view';

  const idParam = goalId ?? issueId ?? extId;
  const numericId = idParam && !isNaN(Number(idParam)) ? Number(idParam) : null;

  return {
    type,
    mode,
    id: mode === 'create' ? null : numericId,
  };
};
