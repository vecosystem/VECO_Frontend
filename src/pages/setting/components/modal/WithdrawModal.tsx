import { useModalActions } from '../../../../hooks/useModal.ts';
import { createPortal } from 'react-dom';

interface WithdrawModalProps {
  title?: string;
  subtitle: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClose?: () => void;
}

const WithdrawModal = ({
  title = '알림',
  subtitle,
  children,
  disabled = false,
  onClose,
}: WithdrawModalProps) => {
  const { closeModal } = useModalActions();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}
      onClick={handleClose}
    >
      <div
        className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[42.6rem] gap-[2.4rem]`}
        onClick={(e) => e.stopPropagation()}
      >
        <section className={`flex flex-col gap-[1.6rem]`}>
          <h2 className={`text-gray-600 font-title-sub-b`}>{title}</h2>
          <p className={`text-gray-600 font-body-r`}>{subtitle}</p>
        </section>
        {children}
        <div className={`flex justify-end`}>
          <button
            className={`px-[1.6rem] py-[0.8rem] rounded-[0.6rem] bg-gray-300 text-gray-100 font-small-b ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-red-400 cursor-pointer'}`}
            onClick={handleClose}
            disabled={disabled}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default WithdrawModal;
