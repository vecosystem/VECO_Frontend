import IcX from '../../../assets/icons/x.svg';
import IcCheck from '../../../assets/icons/white-check.svg';
import CopyToClipboard from '../../../components/Onboarding/CopyToClipboard.tsx';
import { useRef } from 'react';

interface MemberInviteModalProps {
  onClick: () => void;
}

const MemberInviteModal = (props: MemberInviteModalProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}>
      <div
        className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[44.8rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex w-full justify-between`}>
          <h2 className={`text-gray-600 font-title-sub-b`}>팀원 초대</h2>
          <img src={IcX} alt={'닫기'} onClick={props.onClick} />
        </div>
        <p className={`mt-[0.8rem] text-gray-500 font-body-r`}>팀원을 **님의 팀에 초대해봐요</p>
        <section className={`flex justify-between mt-[1.6rem] items-start gap-x-[0.8rem]`}>
          <textarea
            className={`flex-1 border border-gray-300 rounded-[0.6rem] h-[8rem] px-[1.2rem] py-[0.8rem]
            placeholder:text-gray-600 font-xsmall-r text-gray-600 focus:outline-none resize-none`}
            disabled={true}
            placeholder={'팀원: URL a;lksdjf;ajf;aj a;ljf ;ajdf;lakjdf;alkjf;j'}
            ref={inputRef}
          />
          <CopyToClipboard inputRef={inputRef} />
        </section>
        <div
          className={`flex justify-center items-center gap-x-[0.8rem] mt-[1.6rem] py-[0.8rem]
          bg-primary-blue font-small-b text-gray-200 rounded-[0.6rem]`}
        >
          <img src={IcCheck} alt={'팀원 초대 완료'} />
          <span>팀원 초대 완료</span>
        </div>
      </div>
    </div>
  );
};

export default MemberInviteModal;
