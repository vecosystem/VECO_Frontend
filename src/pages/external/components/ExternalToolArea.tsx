import { useState } from 'react';
import LinkButton from '../../../assets/icons/link-button.svg';
import GitIcon from '../../../assets/icons/github.svg';
import SlackIcon from '../../../assets/icons/slack.svg';
import PlusBlueIcon from '../../../assets/icons/plus-blue.svg';
import ExternalToolModal from './ExternalToolModal';

interface Props {
  isLinkedWithGithub: boolean;
  isLinkedWithSlack: boolean;
}

const ExternalToolArea = ({ isLinkedWithGithub, isLinkedWithSlack }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const linkedToolCount = Number(isLinkedWithGithub) + Number(isLinkedWithSlack);

  return (
    <>
      {/* 연동하기 버튼 */}
      {linkedToolCount === 0 && (
        <button className="ml-[1.6rem] cursor-pointer" onClick={handleButtonClick}>
          <img src={LinkButton} alt="연동하기 버튼" />
        </button>
      )}
      <div className="flex gap-[2rem] ml-[3.2rem]">
        {isLinkedWithGithub && <img src={GitIcon} className="w-[2.4rem] h-[2.4rem]" alt="GitHub" />}
        {isLinkedWithSlack && <img src={SlackIcon} className="w-[2.4rem] h-[2.4rem]" alt="Slack" />}
      </div>
      {linkedToolCount === 1 && (
        <img
          src={PlusBlueIcon}
          className="ml-[3.2rem] w-[2.4rem] h-[2.4rem] cursor-pointer"
          alt="추가"
          onClick={handleButtonClick}
        />
      )}
      {isModalOpen && <ExternalToolModal onClose={handleCloseModal} />}
    </>
  );
};

export default ExternalToolArea;
