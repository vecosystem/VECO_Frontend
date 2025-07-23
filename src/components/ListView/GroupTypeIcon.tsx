import type { ItemFilter, PriorityCode, StatusCode } from '../../types/listItem';
import GoalIcon from '../../assets/icons/goal.svg';
import GoalGrayIcon from '../../assets/icons/goal-gray.svg';
import profileIcon from '../../assets/icons/user-base.svg';
import SlackIcon from '../../assets/icons/slack.svg';
import GithubIcon from '../../assets/icons/github.svg';
import { getPriorityIcon, getStatusColor } from '../../utils/listItemUtils';

interface Props {
  filter: ItemFilter;
  typeKey: string;
  profileImghUrl?: string;
}

const GroupTypeIcon = ({ filter, typeKey, profileImghUrl }: Props) => {
  if (filter === '상태') {
    return (
      <span
        className="inline-block rounded-full w-[1.6rem] h-[1.6rem] mr-[0.8rem]"
        style={{ background: getStatusColor(typeKey as StatusCode) }}
      />
    );
  }
  if (filter === '우선순위') {
    return (
      <img
        src={getPriorityIcon(typeKey as PriorityCode)}
        alt={typeKey}
        className="w-[3.2rem] h-[3.2rem] mr-[0.8rem]"
      />
    );
  }
  if (filter === '담당자') {
    return (
      <img
        className="inline-block w-[2.4rem] h-[2.4rem] rounded-full mr-[1.2rem] bg-center bg-cover"
        src={profileImghUrl || profileIcon}
        alt="담당자"
      />
    );
  }
  if (filter === '목표') {
    return (
      <img
        src={typeKey === '없음' ? GoalGrayIcon : GoalIcon}
        alt="삭제"
        className="w-[2.4rem] h-[2.4rem] mr-[0.8rem]"
      />
    );
  }
  if (filter === '외부') {
    return (
      <img
        src={typeKey === 'GITHUB' ? GithubIcon : SlackIcon}
        alt="외부"
        className="w-[2.4rem] h-[2.4rem] mr-[0.8rem]"
      />
    );
  }
};

export default GroupTypeIcon;
