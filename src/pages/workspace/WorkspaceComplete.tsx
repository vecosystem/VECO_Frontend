import { useGetWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkspaceComplete = () => {
  const { data } = useGetWorkspaceProfile();
  const teamId = data?.defaultTeamId;
  const navigate = useNavigate();
  useEffect(() => {
    if (teamId !== undefined) {
      // 팀 ID를 사용하여 워크스페이스 페이지로 리다이렉트
      navigate('/workspace/default/team/:teamId/issue'.replace(':teamId', String(teamId)), {
        replace: true,
      });
    }
  }, [teamId]);
  return <div />;
};

export default WorkspaceComplete;
