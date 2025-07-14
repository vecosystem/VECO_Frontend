import IcX from '../../../assets/icons/x.svg';
import CopyToClipboard from '../../../components/Onboarding/CopyToClipboard.tsx';
import { useRef } from 'react';

interface MemberInviteModalProps {
  url: string;
  password: string;
  onClick: () => void;
}

const MemberInviteModal = (props: MemberInviteModalProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}>
      <div
        className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[44.8rem] gap-y-[1.6rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <div className={`flex w-full justify-between`}>
            <h2 className={`text-gray-600 font-title-sub-b`}>팀원 초대</h2>
            <img src={IcX} alt={'닫기'} onClick={props.onClick} />
          </div>
          <p className={`mt-[0.8rem] text-gray-500 font-body-r`}>팀원을 00님의 팀에 초대해봐요</p>
        </section>

        <section className={`flex justify-between items-start gap-x-[0.8rem]`}>
          <textarea
            className={`flex-1 border border-gray-300 rounded-[0.6rem] h-[8rem] px-[1.2rem] py-[0.8rem]
            placeholder:text-gray-600 font-xsmall-r text-gray-600 focus:outline-none resize-none`}
            disabled={true}
            placeholder={`팀원 URL : ${props.url}\n\n암호 : ${props.password}`}
            ref={inputRef}
          />
          <CopyToClipboard inputRef={inputRef} />
        </section>

        <button
          className={`py-[0.8rem] bg-primary-blue font-small-b text-gray-200 rounded-[0.6rem]`}
          onClick={props.onClick}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default MemberInviteModal;
