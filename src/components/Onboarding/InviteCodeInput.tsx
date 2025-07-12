import { useState } from 'react';

interface InviteCodeInputProps {
  correctCode: string; // 초대한 사람이 준 암호
}

const InviteCodeInput = ({ correctCode }: InviteCodeInputProps) => {
  const [inputCode, setInputCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedcode = e.target.value;
    setInputCode(typedcode);

    if (typedcode && typedcode !== correctCode) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <input
        type="text"
        value={inputCode}
        onChange={handleChange}
        placeholder="암호를 입력하시오"
        className={`
      w-[40rem] h-[6.2rem] px-[2rem] py-[1.8rem] font-body-r rounded-[0.5rem]
      focus:outline-none text-gray-400 placeholder:text-gray-400
      ${hasError ? 'border border-[#D44242] bg-[#F9FAFB]' : 'bg-gray-200 border border-transparent'}
    `}
      />
      <span className={`font-xsmall-r ${hasError ? 'text-[#D44242]' : 'text-transparent'}`}>
        입력 정보를 다시 확인하세요
      </span>
    </div>
  );
};

export default InviteCodeInput;
