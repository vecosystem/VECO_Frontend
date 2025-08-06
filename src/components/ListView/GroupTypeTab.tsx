import GoalIcon from '../../assets/icons/goal.svg';
import GoalBlueIcon from '../../assets/icons/goal-blue.svg';
import IssueIcon from '../../assets/icons/issue.svg';
import IssueBlueIcon from '../../assets/icons/issue-blue.svg';
import ExternalIcon from '../../assets/icons/external.svg';
import ExternalBlueIcon from '../../assets/icons/external-blue.svg';

const TAB_LIST = ['GOAL', 'ISSUE', 'EXTERNAL'] as const;
const TAB_LABELS: Record<(typeof TAB_LIST)[number], string> = {
  GOAL: '목표',
  ISSUE: '이슈',
  EXTERNAL: '외부',
} as const;

const ICONS = {
  GOAL: GoalIcon,
  ISSUE: IssueIcon,
  EXTERNAL: ExternalIcon,
};

const SELECTED_ICONS = {
  GOAL: GoalBlueIcon,
  ISSUE: IssueBlueIcon,
  EXTERNAL: ExternalBlueIcon,
};

export type NotiTab = (typeof TAB_LIST)[number];

interface TabProps {
  currentTab: NotiTab;
  onTabChange: (tab: NotiTab) => void;
}

const GroupTypeTab = ({ currentTab, onTabChange }: TabProps) => {
  return (
    <div className="relative">
      <div className="absolute left-[-3.2rem] right-[-3.2rem] bottom-0 h-[0.1rem] bg-gray-300" />
      <div className="flex gap-[2rem] items-center">
        {TAB_LIST.map((tab) => (
          <div key={tab} className="relative">
            <button
              className="flex gap-[0.8rem] items-center pb-[1rem]"
              onClick={() => onTabChange(tab)}
            >
              <img
                src={currentTab === tab ? SELECTED_ICONS[tab] : ICONS[tab]}
                className="w-[2.4rem] h-[2.4rem]"
              />
              <span className={`font-small-b ${currentTab === tab ? 'text-primary-blue' : ''}`}>
                {TAB_LABELS[tab]}
              </span>
            </button>

            {currentTab === tab && (
              <div className="absolute h-[0.3rem] bg-primary-variant-blue left-[-1rem] right-[-1rem] bottom-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTypeTab;
