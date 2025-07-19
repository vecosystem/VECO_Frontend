interface SubProfileImageProps {
  profileImage: string | null;
}

const SubProfileImage = ({ profileImage }: SubProfileImageProps) => {
  return (
    <div className={`relative left-[-0.3rem] z-5`}>
      {profileImage ? (
        <img
          className={`rounded-full w-[1.6rem] h-[1.6rem] object-cover`}
          src={profileImage}
          alt={profileImage}
        />
      ) : (
        <div className={`rounded-full bg-gray-400 w-[1.6rem] h-[1.6rem]`} />
      )}
    </div>
  );
};

export default SubProfileImage;
