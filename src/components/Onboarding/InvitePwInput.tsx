interface InvitePwInputProps {
  inputPw: string; // 상위 컴포넌트에서 내려준 입력값 (input의 value로 사용)
  onChange: (value: string) => void; // 입력이 변경되었을 때 상위에 전달할 함수
  hasError: boolean; // 에러 상태
}

const InvitePwInput = ({ inputPw, onChange, hasError }: InvitePwInputProps) => {
  // input의 값이 바뀔 때 호출되는 함수
  // 사용자가 입력한 값을 상위 컴포넌트로 전달
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // 상위 컴포넌트로 전달
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {/* 암호 입력창 */}
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
      {/* 에러 메시지 */}
      <span className={`font-xsmall-r ${hasError ? 'text-error-400' : 'text-transparent'}`}>
        입력 정보를 다시 확인하세요
      </span>
    </div>
  );
};

export default InvitePwInput;
