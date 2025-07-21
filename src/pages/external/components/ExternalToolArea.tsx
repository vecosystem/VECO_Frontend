import { useState } from 'react';
import LinkButton from '../../../assets/icons/link-button.svg';
import GitIcon from '../../../assets/icons/github.svg';
import SlackIcn from '../../../assets/icons/slack.svg';
import PlusBlueIcon from '../../../assets/icons/plus-blue.svg';
import ExternalToolModal from './ExternalToolModal';

const ExternalToolArea = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="ml-[1.6rem] cursor-pointer" onClick={handleButtonClick}>
        {/* 연동하기 버튼 */}
        <img src={LinkButton} />
      </button>
      <div className="flex gap-[2rem] ml-[3.2rem]">
        <img src={GitIcon} className="w-[2.4rem] h-[2.4rem]" alt="GitHub" />
        <img src={SlackIcn} className="w-[2.4rem] h-[2.4rem]" alt="Slack" />
      </div>
      <img
        src={PlusBlueIcon}
        className="ml-[3.2rem] w-[2.4rem] h-[2.4rem] cursor-pointer"
        alt="추가"
        onClick={handleButtonClick}
      />
      {isModalOpen && <ExternalToolModal onClose={handleCloseModal} />}
    </>
  );
};

export default ExternalToolArea;
