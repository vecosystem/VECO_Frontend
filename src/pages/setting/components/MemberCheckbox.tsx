import IcCheck from '../../../assets/icons/white-check.svg';

interface MemberCheckboxProps {
  name: string;
  checked: boolean;
  onSelect: (checked: boolean) => void;
}

const MemberCheckbox = (props: MemberCheckboxProps) => {
  return (
    <div
      className={`flex items-center gap-x-[0.8rem]`}
      onClick={() => props.onSelect(!props.checked)}
    >
      <div className={`p-[0.4rem]`}>
        {props.checked ? (
          <div
            className={`flex items-center justify-center border-[0.2rem] border-primary-blue bg-primary-blue rounded-[0.3rem] w-[1.6rem] h-[1.6rem]`}
          >
            <img src={IcCheck} alt={'체크 아이콘'} />
          </div>
        ) : (
          <div
            className={`border-[0.2rem] border-gray-400 rounded-[0.3rem] w-[1.6rem] h-[1.6rem]`}
          />
        )}
      </div>
      <span className={`font-small-b text-gray-400`}>{props.name}</span>
    </div>
  );
};

export default MemberCheckbox;
