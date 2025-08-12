import logo from '../../assets/logos/veco-circle-logo-bg-navy.svg';

interface WorkspaceIconProps {
  workspaceName?: string;
  workspaceImgUrl?: string;
  onClick?: () => void;
}

const WorkspaceIcon = ({ workspaceName, workspaceImgUrl, onClick }: WorkspaceIconProps) => {
  return (
    <div className="flex">
      <div className="flex gap-[1.6rem] items-center cursor-pointer w-fit" onClick={onClick}>
        <span
          className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${workspaceImgUrl || logo}")` }}
        />
        <div className="flex font-title-b">{workspaceName || 'Workspace'}</div>
      </div>
    </div>
  );
};

export default WorkspaceIcon;
