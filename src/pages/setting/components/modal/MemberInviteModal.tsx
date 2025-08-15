import IcX from '../../../../assets/icons/x.svg';
import CopyToClipboard from '../../../../components/Onboarding/CopyToClipboard.tsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalButton from './ModalButton.tsx';
import { getInviteMembers } from '../../../../apis/setting/useGetInviteMembers.ts';

interface MemberInviteModalProps {
  onClick: () => void;
}

const MemberInviteModal = ({ onClick }: MemberInviteModalProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inviteData, setInviteData] = useState<{
    name: string;
    inviteUrl: string;
    invitePassword: string;
  } | null>(null);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const data = await getInviteMembers();
        const inviteData = data.result;
        console.log(inviteData);
        setInviteData(inviteData ?? null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvite();
  }, []);

  return createPortal(
    <div className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}>
      <div
        className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[44.8rem] gap-y-[1.6rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <section>
          <div className={`flex w-full justify-between`}>
            <h2 className={`text-gray-600 font-title-sub-b`}>팀원 초대</h2>
            <img src={IcX} alt={'닫기'} onClick={onClick} className="cursor-pointer" />
          </div>
          <p className={`mt-[0.8rem] text-gray-500 font-body-r`}>
            {inviteData
              ? `팀원을 ${inviteData.name}님의 팀에 초대해봐요`
              : '초대 정보를 불러오지 못했어요.'}
          </p>
        </section>

        <section className={`flex justify-between items-start gap-x-[0.8rem]`}>
          <textarea
            className={`flex-1 border border-gray-300 rounded-[0.6rem] h-[8rem] px-[1.2rem] py-[0.8rem]
            font-xsmall-r text-gray-600 focus:outline-none resize-none`}
            readOnly
            value={
              inviteData
                ? `팀원 URL : ${inviteData.inviteUrl}\n\n암호 : ${inviteData.invitePassword}`
                : ''
            }
            ref={inputRef}
          />
          <CopyToClipboard inputRef={inputRef} />
        </section>

        <ModalButton text={'닫기'} onClick={onClick} />
      </div>
    </div>,
    document.body
  );
};

export default MemberInviteModal;
