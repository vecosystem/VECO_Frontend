import { useModalActions } from '../../hooks/useModal.ts';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface ModalProps {
  title?: string;
  subtitle?: ReactNode;
  buttonText?: string;
  buttonColor?: string;
  onClick?: () => void;
}

const Modal = ({
  title = '알림',
  subtitle = <>정말로 삭제하시겠습니까?</>,
  buttonText = '확인',
  buttonColor = 'bg-primary-blue',
  onClick = () => {},
}: ModalProps) => {
  const { closeModal } = useModalActions();

  return createPortal(
    <div className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}>
      <div
        className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[36rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-gray-600 font-title-sub-b mb-[1.6rem]`}>{title}</h2>
        <p className={`text-gray-600 font-body-r mb-[2.4rem]`}>{subtitle}</p>
        <div className={`flex justify-end`}>
          <button
            className={`px-[1.6rem] py-[0.8rem] rounded-[0.6rem] ${buttonColor} text-zinc-50 font-small-b`}
            onClick={() => {
              onClick();
              closeModal();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
