import IcUser from '../../../assets/icons/user-base.svg';

interface SubProfileImageProps {
  profileImage: string | null;
}

const SubProfileImage = ({ profileImage }: SubProfileImageProps) => {
  return (
    <div className={`relative left-[-1rem] z-5`}>
      {profileImage ? (
        <img
          className={`rounded-full w-[2rem] h-[2rem] object-cover`}
          src={profileImage}
          alt={profileImage}
        />
      ) : (
        <img src={IcUser} alt={'기본 프로필 이미지'} />
      )}
    </div>
  );
};

export default SubProfileImage;
