import React from 'react';

interface TeamHeaderProps {
  title: string;
  buttonText: string;
  onClick: () => void;
  children: React.ReactNode;
}

const TeamHeader = (props: TeamHeaderProps) => {
  return (
    <section className={`flex flex-col px-[3.2rem] pt-[3.2rem] pb-[1rem]`}>
      <h1 className={`text-gray-600 font-title-b mb-[1.6rem]`}>{props.title}</h1>
      <div className={`flex justify-end`}>
        <button
          className={`bg-primary-blue rounded-[0.6rem] text-gray-100 font-small-r px-[0.9rem] py-[0.8rem]`}
          onClick={props.onClick}
        >
          {props.buttonText}
        </button>
      </div>
      <div
        className={`flex w-full mt-[2rem] justify-between items-center text-gray-600 font-body-b pe-[6.8rem]`}
      >
        {props.children}
      </div>
    </section>
  );
};

export default TeamHeader;
