import IcX from '../../../../assets/icons/x.svg';
import CopyToClipboard from '../../../../components/Onboarding/CopyToClipboard.tsx';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import ModalButton from './ModalButton.tsx';

interface MemberInviteModalProps {
  memberName: string;
  url: string;
  password: string;
  onClick: () => void;
}

const MemberInviteModal = (props: MemberInviteModalProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  return createPortal(
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
          <p className={`mt-[0.8rem] text-gray-500 font-body-r`}>
            팀원을 ${props.memberName}님의 팀에 초대해봐요
          </p>
        </section>

        <section className={`flex justify-between items-start gap-x-[0.8rem]`}>
          <textarea
            className={`flex-1 border border-gray-300 rounded-[0.6rem] h-[8rem] px-[1.2rem] py-[0.8rem]
            font-xsmall-r text-gray-600 focus:outline-none resize-none`}
            disabled={true}
            readOnly={true}
            value={`팀원 URL : ${props.url}\n\n암호 : ${props.password}`}
            ref={inputRef}
          />
          <CopyToClipboard inputRef={inputRef} />
        </section>

        <ModalButton text={'닫기'} onClick={props.onClick} />
      </div>
    </div>,
    document.body
  );
};

export default MemberInviteModal;
