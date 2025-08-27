interface InvitePwInputProps {
  inputPw: string;
  onChange: (value: string) => void;
  hasError: boolean;
}

const InvitePwInput = ({ inputPw, onChange, hasError }: InvitePwInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <input
        type="text"
        value={inputPw}
        onChange={handleChange}
        placeholder="암호를 입력하시오"
        className={`
      w-[40rem] h-[6.2rem] px-[2rem] py-[1.8rem] font-body-r rounded-[0.5rem]
      focus:outline-none text-gray-400 placeholder:text-gray-400
      ${hasError ? 'border border-error-400 bg-gray-onboard' : 'border bg-gray-200 border-transparent'}`}
      />
      <span className={`font-xsmall-r ${hasError ? 'text-error-400' : 'text-transparent'}`}>
        입력 정보를 다시 확인하세요
      </span>
    </div>
  );
};

export default InvitePwInput;
