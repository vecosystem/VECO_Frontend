import userCircleIcon from '../../assets/icons/user-circle.svg';
import SettingDropdown from '../../components/Dropdown/SettingDropdown';
import WithdrawModal from './components/modal/WithdrawModal';
import PencilIcon from '../../assets/icons/pencil.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import CheckBoxIcon from '../../assets/icons/check-box-x.svg';
import CheckBoxRedIcon from '../../assets/icons/check-box-o-red.svg';
import { useState, useRef } from 'react';
import { useModalActions, useModalInfo } from '../../hooks/useModal.ts';
import Modal from '../../components/Modal/Modal.tsx';
const SettingMyProfile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { isOpen, content } = useModalInfo();
  const { openModal } = useModalActions();
  const [isAgree, setIsAgree] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage] = useState<string | null>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleAgree = () => {
    setIsAgree(!isAgree);
    openModal({ name: 'withdraw' });
  };

  const handleProfileImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profile', file);

    // TODO: API 호출
  };

  return (
    <div className="flex w-full h-full pt-[10rem] justify-center">
      <div className="flex flex-col w-[62.8rem]">
        <h1 className="font-title-b text-gray-600">나의 프로필</h1>
        <hr className="w-full h-[0.1rem] my-[2.4rem] border-none bg-gray-300" />
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <section className="flex h-[4.2rem] items-center justify-between">
              <h2 className="font-title-sub-r text-gray-600">프로필 사진</h2>
              <div className="relative">
                <button
                  className="w-[4.2rem] h-[4.2rem] flex items-center justify-center cursor-pointer"
                  onClick={handleDropdownToggle}
                >
                  <img
                    src={profileImage || userCircleIcon}
                    className="w-full h-full"
                    alt="프로필 사진"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleProfileImageChange}
                    style={{ display: 'none' }}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+0.4rem)] left-[0.4rem]">
                    <SettingDropdown
                      options={[
                        {
                          value: '삭제',
                          onClick: () => {},
                          icon: <img src={TrashIcon} width={16} height={16} alt="삭제" />,
                        },
                        {
                          value: '수정',
                          onClick: handleProfileImageUploadClick,
                          icon: <img src={PencilIcon} width={16} height={16} alt="수정" />,
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
            </section>
            <div className="flex flex-col gap-[3.2rem]">
              <section className="flex flex-col gap-[0.8rem]">
                <span className="font-body-r text-gray-600">이름</span>
                <input
                  type="text"
                  placeholder="박진주"
                  className="w-full h-[3.6rem] px-[1.2rem] py-[0.8rem] bg-gray-200 border-[0.1rem] border-gray-300 rounded-md font-body-r placeholder:text-gray-300"
                  disabled
                />
              </section>
              <section className="flex flex-col gap-[0.8rem]">
                <span className="font-body-r text-gray-600">이메일</span>
                <input
                  type="text"
                  placeholder="park@naver.com"
                  className="w-full h-[3.6rem] px-[1.2rem] py-[0.8rem] bg-gray-200 border-[0.1rem] border-gray-300 rounded-md font-body-r placeholder:text-gray-300"
                  disabled
                />
              </section>
            </div>
          </div>
          <div className="flex flex-col gap-[2.4rem]">
            <section className="flex justify-between">
              <span className="font-title-sub-r text-gray-600">회원탈퇴</span>
              <button
                className="w-[12.8rem] px-[1.6rem] py-[0.8rem] justify-center items-center rounded-md bg-gray-200 font-small-r text-[#F00] cursor-pointer"
                onClick={() => openModal({ name: 'withdraw' })}
              >
                회원탈퇴
              </button>
            </section>
            <section className="flex justify-between">
              <span className="font-title-sub-r text-gray-600">로그아웃</span>
              <button
                className="w-[12.8rem] px-[1.6rem] py-[0.8rem] justify-center items-center rounded-md bg-gray-200 font-small-r text-[#F00] cursor-pointer"
                onClick={() => openModal({ name: 'logout' })}
              >
                로그아웃
              </button>
            </section>
          </div>
        </div>
      </div>
      {isOpen && content?.name === 'withdraw' && (
        <WithdrawModal
          title="정말로 탈퇴하시겠어요?"
          subtitle="탈퇴 시 모든 데이터가 즉시 삭제되며, 복구가 불가능합니다."
          children={
            <button
              className="flex items-center gap-[0.8rem] font-xsmall-r text-gray-500 cursor-pointer"
              onClick={handleAgree}
            >
              <img
                src={isAgree ? CheckBoxRedIcon : CheckBoxIcon}
                alt="체크박스"
                className="w-[1.6rem] h-[1.6rem]"
              />
              위의 내용을 확인했으며 모든 사항에 동의합니다.
            </button>
          }
          disabled={!isAgree}
          onClose={() => setIsAgree(false)}
        />
      )}
      {isOpen && content?.name === 'logout' && (
        <Modal
          title="로그아웃"
          subtitle="정말로 로그아웃하시겠습니까?"
          buttonText="로그아웃"
          buttonColor="bg-error-400"
          onClick={() => console.log('Modal Button Clicked')}
        />
      )}
    </div>
  );
};

export default SettingMyProfile;
