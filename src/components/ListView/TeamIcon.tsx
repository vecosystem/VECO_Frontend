import logo from '../../assets/logos/veco-circle-logo-bg-white.svg';

interface TeamIconProps {
  teamName?: string;
  teamImgUrl?: string;
}

const TeamIcon = ({ teamName, teamImgUrl }: TeamIconProps) => {
  return (
    <>
      <div className="flex gap-[1.6rem] items-center">
        <span
          className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${teamImgUrl || logo}")` }}
        />
        <div className="flex font-title-b">{teamName || 'Team'}</div>
      </div>
    </>
  );
};

export default TeamIcon;
