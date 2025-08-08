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
  id: string;
  isDefaultTeam: boolean;
}

export const useToggleMode = ({ mode, setMode, type, id, isDefaultTeam }: UseToggleModeProps) => {
  const navigate = useNavigate();
  const { teamId } = useParams<{ teamId: string }>();

  const getBasePath = () => {
    if (!teamId) return '';
    return isDefaultTeam
      ? `/workspace/default/team/${teamId}/${type}`
      : `/workspace/team/${teamId}/${type}`;
  };

  const handleToggleMode = useCallback(() => {
    const base = getBasePath();
    if (!base) return;

    if (mode === 'create') {
      setMode('view');
      navigate(`${base}/${id}`);
    } else if (mode === 'edit') {
      setMode('view');
      navigate(`${base}/${id}`);
    } else if (mode === 'view') {
      setMode('edit');
      navigate(`${base}/${id}/edit`);
    }
  }, [mode, id, navigate, setMode, isDefaultTeam, teamId, type]);

  return handleToggleMode;
};
