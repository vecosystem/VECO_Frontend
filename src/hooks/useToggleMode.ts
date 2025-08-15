/**
 * 목표/이슈/외부 상세페이지에서 mode 전환을 위한 커스텀 훅
 * - 생성 모드(create), 수정 모드(edit), 조회 모드(view) 간의 전환을 관리
 * - 모드별 URL 경로를 변경하여 페이지 전환을 처리
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

type Mode = 'create' | 'view' | 'edit';

interface UseToggleModeProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  type: 'goal' | 'issue' | 'ext';
  id?: number; // 초기값은 optional, 실행시 override 가능
  isDefaultTeam: boolean;
}

export const useToggleMode = ({ mode, setMode, type, id, isDefaultTeam }: UseToggleModeProps) => {
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
      if (effectiveId == null) return; // id 없으면 아무 것도 하지 않음

      if (mode === 'create' || mode === 'edit') {
        setMode('view');
        navigate(`${base}/${effectiveId}`, { replace: mode === 'create' }); // create 모드일 때만 replace 적용하여 기존 생성 페이지 기록 삭제
      } else if (mode === 'view') {
        setMode('edit');
        navigate(`${base}/${effectiveId}/edit`);
      }
    },
    [getBasePath, mode, id, navigate, setMode]
  );

  return handleToggleMode;
};
