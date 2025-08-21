import TeamIcon from '../ListView/TeamIcon';
import { useGetGoalName } from '../../apis/goal/useGetGoalName.ts';
import { useGetExternalName } from '../../apis/external/useGetExternalName.ts';
import { useGetIssueName } from '../../apis/issue/useGetIssueName.ts';
import { useGetWorkspaceTeams } from '../../apis/setting/useGetWorkspaceTeams.ts';
import { useMemo } from 'react';

interface DetailHeaderProps {
  type: 'goal' | 'issue' | 'external';
  defaultTitle: string; // 상세페이지 제목에 아무것도 입력되지 않았을 때 기본 타이틀
  title: string; // 상세페이지 제목으로부터 전달받아올 타이틀
}

const DetailHeader = ({ type, defaultTitle, title }: DetailHeaderProps) => {
  const teamId = Number(useParams<{ teamId: string }>().teamId);
  const { data: detailId } =
    type === 'goal'
      ? useGetGoalName(teamId)
      : type === 'issue'
        ? useGetIssueName(teamId)
        : useGetExternalName(teamId);

  // 팀 정보 불러오기
  const { data: teamData } = useGetWorkspaceTeams();
  const currentTeam = useMemo(() => {
    return teamData?.pages[0].teamList.find((team) => team.teamId === Number(teamId));
  }, [teamData, teamId]);

  return (
    <div className="flex gap-[3.2rem] flex-nowrap">
      {/* 팀 아이콘, 팀명, props로 요소 전달 가능 */}
      <TeamIcon
        teamName={currentTeam?.teamName}
        teamImgUrl={currentTeam?.teamImageUrl}
      />
      <div className="flex gap-[1.6rem] items-center overflow-hidden">
        {/* 상세페이지 ID */}
        <div className="flex whitespace-nowrap font-body-b text-gray-600">{detailId}</div>
        {/**
         * 상세페이지 이름
         * - 상세페이지 제목에 아무것도 입력되지 않았을 때는 defaultTitle(placeholder명과 동일) 렌더링
         * - 입력됐을 때는 title(상세페이지 제목에 입력한 문자열) 렌더링
         */}
        <div className="font-body-r text-gray-400 truncate">{title || defaultTitle}</div>
      </div>
    </div>
  );
};

export default DetailHeader;
