import { useState } from 'react';
import copy from '../../assets/icons/copy.svg';
import speechbubblebody from '../../assets/icons/speechbubblebody.svg';
import speechbubbletail from '../../assets/icons/speechbubbletail.svg';

// props로 전달받은 inputRef를 통해 복사 대상 엘리먼트에 접근
interface CopyToClipboardProps {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const CopyToClipboard = ({ inputRef }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false); // 복사 완료 여부 상태

  const handleCopy = () => {
    try {
      if (inputRef.current) {
        const textarea = inputRef.current;

        // 일부 iOS 브라우저에서 select() 동작이 안 되는 이슈를 피하기 위해 readOnly로 설정
        textarea.readOnly = true;
        textarea.select(); // 전체 텍스트 선택

        const success = document.execCommand('copy'); // 복사 시도
        textarea.readOnly = false; // 다시 원래대로 복원

        if (success) {
          setCopied(true); // 복사 성공 시 상태를 true로 변경 (말풍선 띄우기 위함)
          setTimeout(() => setCopied(false), 2000); // 2초 후 다시 false로 (말풍선 사라짐)
        } else {
          alert('복사에 실패했습니다. 직접 복사해주세요.');
        }
      }
    } catch (error) {
      console.error('복사 중 오류 발생:', error);
      alert('복사에 실패했습니다. 직접 복사해주세요.');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex relative w-[4rem] h-[3.6rem] rounded-[0.6rem] bg-primary-blue items-center justify-center"
      aria-label="클립보드에 복사"
    >
      <img src={copy} alt="Copy" className="w-[1.6rem] h-[1.6rem]" />
      {copied && (
        <div className="absolute top-[-6.2rem] w-[14.4rem] h-[6.5rem] flex flex-col items-center">
          {/* 말풍선 바디 + 텍스트 */}
          <div className="relative w-[14.4rem] h-[4.7rem] flex items-center justify-center">
            <img src={speechbubblebody} alt="말풍선 바디" className="absolute w-full h-full" />
            <span className="z-10 text-white font-xsmall-r">복사가 완료되었습니다!</span>
          </div>

          {/* 꼬리 */}
          <img
            src={speechbubbletail}
            alt="말풍선 꼬리"
            className="w-[2rem] h-[1.8rem] -mt-[0.5rem]"
          />
        </div>
      )}
    </button>
  );
};

export default CopyToClipboard;
