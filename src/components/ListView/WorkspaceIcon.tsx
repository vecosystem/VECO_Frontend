import logo from '../../assets/logos/veco-circle-logo-bg-navy.svg';

interface WorkspaceIconProps {
  workspaceName?: string;
  workspaceImgUrl?: string;
}

const WorkspaceIcon = ({ workspaceName, workspaceImgUrl }: WorkspaceIconProps) => {
  return (
    <>
      <div className="flex gap-[1.6rem] items-center">
        <span
          className="inline-block w-[3.2rem] h-[3.2rem] rounded-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${workspaceImgUrl || logo}")` }}
        />
        <div className="flex font-title-b">{workspaceName || 'Workspace'}</div>
      </div>
    </>
  );
};

export default WorkspaceIcon;
