interface ModalButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ModalButton = (props: ModalButtonProps) => {
  return (
    <button
      className={`py-[0.8rem] disabled:bg-gray-300 bg-primary-blue font-small-b text-gray-200 rounded-[0.6rem] ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default ModalButton;
