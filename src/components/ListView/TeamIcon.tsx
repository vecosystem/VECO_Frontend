import logo from '../../assets/logos/veco-circle-logo-bg-white.svg';

interface TeamIconProps {
  teamName?: string;
  teamImgUrl?: string;
}

const TeamIcon = ({ teamName, teamImgUrl }: TeamIconProps) => {
  return (
<<<<<<< HEAD
    <div className="flex gap-[1.6rem] items-center">
      <span
        className="inline-block w-[3.2rem] h-[3.2rem] rounded-full border-[0.1rem] border-gray-200 bg-gray-100 bg-center bg-cover"
        style={{
          backgroundImage: `url(${teamImgUrl || '/vecosmall.svg'})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex font-title-b">{teamName || 'Team'}</div>
    </div>
=======
    <>
      <div className="flex gap-[1.6rem] items-center">
        <span
          className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${teamImgUrl || logo}")` }}
        />
        <div className="flex font-title-b">{teamName || 'Team'}</div>
      </div>
    </>
>>>>>>> 3329a524fdf7390b8fd94b4502abe0c31ffbf3ed
  );
};

export default TeamIcon;
