interface ProfileImageProps {
  profileImage: string | null;
}

const ProfileImage = ({ profileImage }: ProfileImageProps) => {
  return (
    <div className={`p-[0.4rem]`}>
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
