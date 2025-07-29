import React from 'react';

interface InputSectionProps {
  label: string;
  placeholder: string;
  disabled?: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ label, placeholder, disabled = false }) => {
  return (
    <section className="flex flex-col gap-[0.8rem]">
      <span className="font-body-r text-gray-600">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[3.6rem] px-[1.2rem] py-[0.8rem] bg-gray-200 border-[0.1rem] border-gray-300 rounded-md font-body-r placeholder:text-gray-300"
        disabled={disabled}
      />
    </section>
  );
};

export default InputSection;
