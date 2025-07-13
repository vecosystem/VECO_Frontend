interface ProfileImageProps {
  profileImage: string | null;
}

const ProfileImage = ({ profileImage }: ProfileImageProps) => {
  if (!profileImage) return <div className={`rounded-full bg-gray-300 w-[2rem] h-[2rem]`} />;

  return (
    <img
      className={`rounded-full w-[2rem] h-[2rem] object-cover`}
      src={profileImage}
      alt={profileImage}
    />
  );
};

export default ProfileImage;
