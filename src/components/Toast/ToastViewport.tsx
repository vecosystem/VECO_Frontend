import { createPortal } from 'react-dom';
import { useToast } from './ToastProvider';

const ToastViewport = () => {
  const { visible } = useToast();

  return createPortal(
    <div
      className="fixed bottom-[5.8rem] right-[4.8rem] z-30 pointer-events-none"
      role="status" // 상태메시지용
      aria-live="polite" // 텍스트 업데이트 시 대기 후 스크린리더가 읽음
      aria-atomic="true" // 메시지 전체를 한 번에 읽게 함
    >
      {visible.map((t) => (
        <div
          key={t.id}
          className="flex flex-col pointer-events-auto p-[2.4rem] rounded-lg border border-gray-300 bg-gray-200"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2 className="font-title-sub-b text-gray-600">{t.title}</h2>
          <p className="font-body-r text-gray-600">{t.contents}</p>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastViewport;
