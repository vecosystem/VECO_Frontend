import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';

const SettingWorkspaceProfile = () => {
  return (
    <div className="flex w-full h-full pt-[10rem] justify-center">
      <div className="flex flex-col w-[62.8rem]">
        <h1 className="font-title-b text-gray-600">워크스페이스</h1>
        <hr className="w-full h-[0.1rem] my-[2.4rem] border-none bg-gray-300" />
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <section className="flex h-[4.2rem] items-center justify-between">
              <h2 className="font-title-sub-r text-gray-600">워크스페이스 로고</h2>

              <button className="w-[4.2rem] h-[4.2rem] flex items-center justify-center">
                <img src={vecocirclenavy} className="w-full h-full" alt="프로필 사진" />
              </button>
            </section>
            <div className="flex flex-col gap-[3.2rem]">
              <section className="flex flex-col gap-[0.8rem]">
                <span className="font-body-r text-gray-600">이름</span>
                <input
                  type="text"
                  placeholder="Veco"
                  className="w-full h-[3.6rem] px-[1.2rem] py-[0.8rem] bg-gray-200 border-[0.1rem] border-gray-300 rounded-md font-body-r placeholder:text-gray-300"
                  disabled
                />
              </section>
              <section className="flex flex-col gap-[0.8rem]">
                <span className="font-body-r text-gray-600">URL</span>
                <input
                  type="text"
                  placeholder="veco.app/veco"
                  className="w-full h-[3.6rem] px-[1.2rem] py-[0.8rem] bg-gray-200 border-[0.1rem] border-gray-300 rounded-md font-body-r placeholder:text-gray-300"
                  disabled
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingWorkspaceProfile;
