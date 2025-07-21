import { createPortal } from 'react-dom';
import GitIcon from '../../../assets/icons/github.svg';
import SlackIcon from '../../../assets/icons/slack.svg';

interface ExternalToolModalProps {
  onClose: () => void;
}

const ExternalToolModal = ({ onClose }: ExternalToolModalProps) => {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/66 z-50"
      onClick={onClose} // 바깥 영역 클릭 시 닫힘
    >
      <div
        className="flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[54.8rem]"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 방지
      >
        <p className="text-gray-600 font-title-b">외부 연동</p>
        <div className="flex mt-[3.2rem] mb-[1.6rem] gap-[1.2rem]">
          {/* 깃허브 버튼 */}
          <div className="flex flex-col w-[24.4rem] gap-[1.2rem] p-[3.2rem] border-[0.1rem] border-gray-300 rounded-[0.5rem]">
            <div className="flex gap-[0.8rem]">
              <img src={GitIcon} className="w-[3rem] h-[3rem]" alt="GitHub" />
              <div className="font-title-sub-b">GitHub</div>
            </div>
            <div className="font-xsmall-r">코드 버전 관리 및 협업</div>
          </div>
          {/* 슬랙 버튼 */}
          <div className="flex flex-col w-[24.4rem] gap-[1.2rem] p-[3.2rem] border-[0.1rem] border-gray-300 rounded-[0.5rem]">
            <div className="flex gap-[0.8rem]">
              <img src={SlackIcon} className="w-[3rem] h-[3rem]" alt="Slack" />
              <div className="font-title-sub-b">Slack</div>
            </div>
            <div className="font-xsmall-r">팀 커뮤니케이션과 알림 연동</div>
          </div>
        </div>
        <button
          className="w-full py-[0.8rem] rounded-[0.6rem] bg-primary-blue text-zinc-50 font-small-b"
          onClick={onClose}
        >
          외부 연동하기
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ExternalToolModal;
