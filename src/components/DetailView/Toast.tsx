import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  title: string;
  contents?: ReactNode;
}

const Toast = ({
  title = '알림',
  contents = <>최대 20자까지 작성할 수 있습니다.</>,
}: ToastProps) => {
  return createPortal(
    <div
      className="fixed bottom-[5.8rem] right-[4.8rem] z-30 pointer-events-none"
      role="status" // 상태메시지용
      aria-live="polite" // 텍스트 업데이트 시 대기 후 스크린리더가 읽음
      aria-atomic="true" // 메시지 전체를 한 번에 읽게 함
    >
      <div
        className="flex flex-col pointer-events-auto p-[2.4rem] rounded-lg border border-gray-300 bg-gray-200"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-title-sub-b text-gray-600">{title}</h2>
        <p className="font-body-r text-gray-600">{contents}</p>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
