import LinkButton from '../../../assets/icons/link-button.svg';
import GitIcon from '../../../assets/icons/github.svg';
import SlackIcn from '../../../assets/icons/slack.svg';
import PlusBlueIcon from '../../../assets/icons/plus-blue.svg';

const ExternalToolArea = () => {
  return (
    <>
      <img src={LinkButton} className="ml-[1.6rem] cursor-pointer" alt="외부 리소스 연결" />
      <div className="flex gap-[2rem] ml-[3.2rem]">
        <img src={GitIcon} className="w-[2.4rem] h-[2.4rem]" alt="GitHub" />
        <img src={SlackIcn} className="w-[2.4rem] h-[2.4rem]" alt="Slack" />
      </div>
      <img
        src={PlusBlueIcon}
        className="ml-[3.2rem] w-[2.4rem] h-[2.4rem] cursor-pointer"
        alt="추가"
      />
    </>
  );
};

export default ExternalToolArea;
