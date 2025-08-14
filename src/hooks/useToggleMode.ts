/**
 * 목표/이슈/외부 상세페이지에서 mode 전환을 위한 커스텀 훅
 * - 생성 모드(create), 수정 모드(edit), 조회 모드(view) 간의 전환을 관리
 * - 모드별 URL 경로를 변경하여 페이지 전환을 처리
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

type Mode = 'create' | 'view' | 'edit';

interface UseToggleModeProps {
  currentMode: Mode;
  type: 'goal' | 'issue' | 'ext';
  id?: number; // 실행 시 override 가능
  isDefaultTeam: boolean;
}

export const useToggleMode = ({ currentMode, type, id, isDefaultTeam }: UseToggleModeProps) => {
  const navigate = useNavigate();
  const { teamId } = useParams<{ teamId: string }>();

  const getBasePath = useCallback(() => {
    if (!teamId) return '';
    return isDefaultTeam
      ? `/workspace/default/team/${teamId}/${type}`
      : `/workspace/team/${teamId}/${type}`;
  }, [isDefaultTeam, teamId, type]);

  const handleToggleMode = useCallback(
    (overrideId?: number) => {
      const base = getBasePath();
      if (!base) return;

      const effectiveId = overrideId ?? id;
      if (effectiveId == null) return;

      if (currentMode === 'create' || currentMode === 'edit') {
        navigate(`${base}/${effectiveId}`, { replace: currentMode === 'create' });
      } else if (currentMode === 'view') {
        navigate(`${base}/${effectiveId}/edit`);
      }
    },
    [getBasePath, currentMode, id, navigate]
  );

  return handleToggleMode;
};
