interface ProfileImageProps {
  profileImage: string | null;
  className?: string;
}

const ProfileImage = ({ profileImage, className }: ProfileImageProps) => {
  return (
    <div className={`z-10 ${className}`}>
      {profileImage ? (
        <img
          className={`rounded-full w-[2rem] h-[2rem] object-cover`}
          src={profileImage}
          alt={profileImage}
        />
      ) : (
        <div className={`rounded-full bg-gray-300 w-[2rem] h-[2rem]`} />
      )}
    </div>
  );
};

export default ProfileImage;
