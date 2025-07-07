interface ModalProps {
  title?: string;
  subtitle: string;
  onClick?: () => void;
}

const Modal = ({ title = '알림', subtitle, onClick = () => {} }: ModalProps) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/66 z-50`}>
      <div className={`flex flex-col bg-white rounded-[0.8rem] p-[2.4rem] w-[36rem]`}>
        <h2 className={`text-gray-600 font-title-sub-b mb-[1.6rem]`}>{title}</h2>
        <p className={`text-gray-600 font-body-r mb-[2.4rem]`}>{subtitle}</p>
        <div className={`flex justify-end`}>
          <button
            className={`px-[1.6rem] py-[0.8rem] rounded-[0.6rem] bg-primary-blue text-zinc-50 font-small-b`}
            onClick={onClick}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
