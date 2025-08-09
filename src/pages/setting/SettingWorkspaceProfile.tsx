import vecocirclenavy from '../../assets/logos/veco-circle-logo-bg-navy.svg';
import InputSection from './components/InputSection.tsx';
import { useGetWorkspaceProfile } from '../../apis/setting/useGetWorkspaceProfile.ts';

const SettingWorkspaceProfile = () => {
  const { data: workspaceData } = useGetWorkspaceProfile();

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
                <img
                  src={workspaceData?.workspaceImageUrl || vecocirclenavy}
                  className="w-full h-full"
                  alt="프로필 사진"
                />
              </button>
            </section>
            <div className="flex flex-col gap-[3.2rem]">
              <InputSection
                label="이름"
                placeholder={workspaceData?.workspaceName || 'Workspace Name'}
                disabled
              />
              <InputSection
                label="URL"
                placeholder={workspaceData?.workspaceUrl || 'Workspace URL'}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingWorkspaceProfile;
