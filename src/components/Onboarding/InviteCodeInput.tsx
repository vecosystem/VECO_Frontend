import { useState } from 'react';

interface InviteCodeInputProps {
  correctCode: string; // 초대한 사람이 준 암호
}

const InviteCodeInput = ({ correctCode }: InviteCodeInputProps) => {
  const [inputCode, setInputCode] = useState(''); // 사용자가 입력한 암호를 저장하는 상태 변수
  const [hasError, setHasError] = useState(false); // 에러 상태를 저장하는 변수

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedCode = e.target.value; // 사용자가 입력한 암호
    setInputCode(typedCode); // 상태 업데이트

    // 입력한 암호가 있고, 초대한 사람이 준 암호와 다르면 에러
    if (typedCode && typedCode !== correctCode) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {/* 텍스트 입력창 */}
      <input
        type="text"
        value={inputCode}
        onChange={handleChange}
        placeholder="암호를 입력하시오"
        className={`
      w-[40rem] h-[6.2rem] px-[2rem] py-[1.8rem] font-body-r rounded-[0.5rem]
      focus:outline-none text-gray-400 placeholder:text-gray-400
      ${hasError ? 'border border-[#D44242] bg-[#F9FAFB]' : 'border bg-gray-200 border-transparent'}`}
      />
      {/* 에러 메시지 */}
      <span className={`font-xsmall-r ${hasError ? 'text-[#D44242]' : 'text-transparent'}`}>
        입력 정보를 다시 확인하세요
      </span>
    </div>
  );
};

export default InviteCodeInput;
