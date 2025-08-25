import { useState } from 'react';
import copy from '../../assets/icons/copy.svg';
import speechbubblebody from '../../assets/icons/speechbubblebody.svg';
import speechbubbletail from '../../assets/icons/speechbubbletail.svg';

interface CopyToClipboardProps {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const CopyToClipboard = ({ inputRef }: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      if (inputRef.current) {
        const textarea = inputRef.current;
        textarea.readOnly = true;
        textarea.select();

        const success = document.execCommand('copy');
        textarea.readOnly = false;

        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
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
          <div className="relative w-[14.4rem] h-[4.7rem] flex items-center justify-center">
            <img src={speechbubblebody} alt="말풍선 바디" className="absolute w-full h-full" />
            <span className="z-10 text-white font-xsmall-r">복사가 완료되었습니다!</span>
          </div>
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
