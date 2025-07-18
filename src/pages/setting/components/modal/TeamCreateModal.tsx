import IcX from '../../../../assets/icons/x.svg';
import { useMemo, useState } from 'react';
import MemberCheckbox from '../MemberCheckbox.tsx';
import { createPortal } from 'react-dom';
import { TEAM_NAME_REGEX } from '../../../../constants/regex.ts';
import ModalButton from './ModalButton.tsx';

interface TeamCreateModalProps {
  onClick: () => void;
}

const DUMMY_MEMBERS = [
  { id: 1, name: '전채운' },
  { id: 2, name: '이가을' },
  { id: 3, name: '박유민' },
  { id: 4, name: '염주원' },
  { id: 5, name: '김선화' },
  { id: 6, name: '박진주' },
  { id: 7, name: '이승현' },
  { id: 8, name: '최지우' },
  { id: 9, name: '김민수' },
  { id: 10, name: '홍길동' },
  { id: 11, name: '이영희' },
  { id: 12, name: '김철수' },
];

const TeamCreateModal = (props: TeamCreateModalProps) => {
  const [teamName, setTeamName] = useState<string>('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const isNameValid = useMemo(() => TEAM_NAME_REGEX.test(teamName), [teamName]);
  const handleSelect = (memberId: number, checked: boolean) => {
    setSelectedMemberIds((prev) =>
      checked ? [...prev, memberId] : prev.filter((id) => id !== memberId)
    );
  };

  const handleSubmit = () => {
    console.log(selectedMemberIds);
    props.onClick();
  };

  return createPortal(
    <div className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}>
      <div
        className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[51.2rem] gap-y-[1.6rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <section className={`flex flex-col gap-y-[3.2rem]`}>
          <div className={`flex w-full justify-between items-center`}>
            <h2 className={`text-gray-600 font-title-sub-b`}>팀원 초대</h2>
            <img src={IcX} alt={'닫기'} onClick={props.onClick} />
          </div>
          <input
            className={`text-start w-full border border-gray-300 px-[1.2rem] py-[0.7rem]
          font-body-r text-gray-400 placeholder:text-gray-400 rounded-[0.6rem] focus:outline-none`}
            type={'text'}
            placeholder={'팀 이름을 입력하세요'}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <p className={`font-body-r mt-[0.8rem]`}>팀원 추가</p>
        </section>

        <section
          className={`grid grid-cols-3 items-start content-start w-full border border-gray-300 
          gap-y-[1.6rem] rounded-[0.6rem] p-[2rem] h-[32.2rem] overflow-y-auto`}
        >
          {DUMMY_MEMBERS.map((member) => (
            <MemberCheckbox
              key={member.id}
              name={member.name}
              checked={selectedMemberIds.includes(member.id)}
              onSelect={(checked) => handleSelect(member.id, checked)}
            />
          ))}
        </section>

        <ModalButton
          text={'팀 생성하기'}
          disabled={!(isNameValid && selectedMemberIds.length > 0)}
          onClick={handleSubmit}
        />
      </div>
    </div>,
    document.body
  );
};

export default TeamCreateModal;
