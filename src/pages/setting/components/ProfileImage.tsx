import IcUser from '../../../assets/icons/user-base.svg';

interface ProfileImageProps {
  profileImage: string | null;
  className?: string;
}

const ProfileImage = ({ profileImage, className }: ProfileImageProps) => {
  return (
    <div className={`z-10 ${className}`}>
      <img
        className={`rounded-full w-[2rem] h-[2rem] object-cover`}
        src={profileImage || IcUser}
        alt={'프로필 이미지'}
      />
    </div>
  );
};

export default ProfileImage;
