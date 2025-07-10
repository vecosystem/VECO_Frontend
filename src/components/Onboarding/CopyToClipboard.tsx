import { useState } from 'react';
import copy from '../../assets/copy.svg';

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
        <div className="absolute top-[-7.1rem] w-[14.4rem] h-[5.7021rem] flex flex-col items-center">
          {/* 말풍선 본체 */}
          <div className="bg-gray-600 text-gray-100 px-[1.5rem] py-[2rem] rounded-[0.5rem] font-xsmall-r  whitespace-nowrap">
            복사가 완료되었습니다!
          </div>
          {/* 꼬리 (삼각형으로 표시) */}
          <div className="w-0 h-0 border-x-[0.8rem] border-x-transparent border-t-[1.2rem] border-t-gray-600" />
        </div>
      )}
    </button>
  );
};

export default CopyToClipboard;
