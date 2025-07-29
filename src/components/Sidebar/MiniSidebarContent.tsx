import expandIcon from '../../assets/icons/expand.svg';
import { useNavigate } from 'react-router-dom';
import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import bellIcon from '../../assets/icons/bell.svg';
import bellHoverIcon from '../../assets/icons/bell-hover.svg';
import goalIcon from '../../assets/icons/goal.svg';
import goalHoverIcon from '../../assets/icons/goal-hover.svg';
import issueIcon from '../../assets/icons/issue.svg';
import issueHoverIcon from '../../assets/icons/issue-hover.svg';
import externalIcon from '../../assets/icons/external.svg';
import externalHoverIcon from '../../assets/icons/external-hover.svg';
import DropdownMenu from './DropdownMenu';
import SidebarItem from './SidebarItem';
import SortableDropdownList from './SortableDropdownList';

interface MiniSidebarContentProps {
  setExpanded: (value: boolean) => void;
  teams: { id: number; name: string; icon: React.ReactNode }[];
}

const MiniSidebarContent = ({ setExpanded, teams }: MiniSidebarContentProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-[3.2rem] pe-[2rem] min-h-screen">
      <div className="flex flex-col items-start gap-[3.2rem] self-stretch">
        <div className="flex items-center gap-[1.6rem] self-stretch">
          <button
            type="button"
            className="flex w-[3.2rem] h-[3.2rem] shrink-0 items-center cursor-pointer"
            onClick={() => navigate('/workspace/team/default/issue')}
          >
            <img src={vecocirclenavy} className="w-full h-full shrink-0" alt="Workspace" />
          </button>
          <button
            type="button"
            className="flex w-[2.4rem] h-[2.4rem] shrink-0 items-center justify-center cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            <img src={expandIcon} className="w-full h-full shrink-0" alt="expand" />
          </button>
        </div>

        <button
          type="button"
          className="group flex min-h-[3.2rem] items-center self-stretch gap-[0.8rem] hover:bg-gray-300 rounded-[0.6rem] cursor-pointer transition-colors duration-150 ease-in-out"
          onClick={() => navigate('/workspace/noti')}
        >
          <img
            src={bellIcon}
            className="w-[2.4rem] h-[2.4rem] block group-hover:hidden"
            alt="Bell"
          />
          <img
            src={bellHoverIcon}
            className="w-[2.4rem] h-[2.4rem] hidden group-hover:block"
            alt="Bell"
          />
        </button>

        <div className="flex flex-col items-start self-stretch">
          {/* 첫 번째 드롭다운: 워크스페이스 전체 팀 */}
          <DropdownMenu headerTitle="전체" initialOpen={true}>
            <div className="flex flex-col">
              <DropdownMenu
                headerTitle=""
                initialOpen={true}
                headerTeamIcon={
                  <img src={vecocirclenavy} className="w-[2.4rem] h-[2.4rem]" alt="Workspace" />
                }
                isNested={true}
              >
                <div className="flex flex-col justify-center items-flex-start gap-[1.6rem] pb-[1.6rem]">
                  <SidebarItem
                    defaultIcon={<img src={goalIcon} alt="Goal" />}
                    hoverIcon={<img src={goalHoverIcon} alt="Goal" />}
                    label=""
                    onClick={() => {
                      navigate(`/workspace/team/default/goal`);
                    }}
                    onAddClick={() => {
                      navigate(`/workspace/team/default/goal/:goalId`);
                    }}
                  />
                  <SidebarItem
                    defaultIcon={<img src={issueIcon} alt="Issue" />}
                    hoverIcon={<img src={issueHoverIcon} alt="Issue" />}
                    label=""
                    onClick={() => {
                      navigate(`/workspace/team/default/issue`);
                    }}
                    onAddClick={() => {
                      navigate(`/workspace/team/default/issue/:issueId`);
                    }}
                  />
                  <SidebarItem
                    defaultIcon={<img src={externalIcon} alt="External" />}
                    hoverIcon={<img src={externalHoverIcon} alt="External" />}
                    label=""
                    onClick={() => {
                      navigate(`/workspace/team/default/ext`);
                    }}
                  />
                </div>
              </DropdownMenu>
            </div>
          </DropdownMenu>
        </div>
        {/* 두 번째 드롭다운: 나의 팀 (내부에 드롭다운 또 포함) */}
        <div className="flex flex-col items-start self-stretch">
          <DropdownMenu headerTitle="나의" initialOpen={true}>
            {/* Team1 드롭다운 (내부 드롭다운) */}
            <SortableDropdownList
              items={teams}
              renderContent={(team, {}, isOverlay) => (
                <DropdownMenu
                  headerTitle=""
                  initialOpen={!isOverlay}
                  headerTeamIcon={team.icon}
                  isNested={true}
                >
                  {!isOverlay && (
                    <div className="flex flex-col justify-center items-start gap-[1.6rem] pb-[1.6rem]">
                      <SidebarItem
                        defaultIcon={<img src={goalIcon} alt="Goal" />}
                        hoverIcon={<img src={goalHoverIcon} alt="Goal" />}
                        label=""
                        onClick={() => {
                          navigate(`/workspace/team/:teamId/goal`);
                        }}
                        onAddClick={() => {
                          navigate(`/workspace/team/:teamId/goal/:goalId`);
                        }}
                      />
                      <SidebarItem
                        defaultIcon={<img src={issueIcon} alt="Issue" />}
                        hoverIcon={<img src={issueHoverIcon} alt="Issue" />}
                        label=""
                        onClick={() => {
                          navigate(`/workspace/team/:teamId/issue`);
                        }}
                        onAddClick={() => {
                          navigate(`/workspace/team/:teamId/issue/:issueId`);
                        }}
                      />
                      <SidebarItem
                        defaultIcon={<img src={externalIcon} alt="External" />}
                        hoverIcon={<img src={externalHoverIcon} alt="External" />}
                        label=""
                        onClick={() => {
                          navigate(`/workspace/team/:teamId/ext`);
                        }}
                      />
                    </div>
                  )}
                </DropdownMenu>
              )}
              onSorted={(newList: any) => console.log(newList)}
            />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MiniSidebarContent;
