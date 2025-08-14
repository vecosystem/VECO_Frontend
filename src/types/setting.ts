export type TeamListResponse = {
  teamId: number;
  teamName: string;
  teamImageUrl: string;
  memberCount: number;
  createdAt: string;
};

export type MemberListResponse = {
  memberId: number;
  email: string;
  name: string;
  profileImageUrl: string | null;
  teams: Team[];
  joinedAt: string;
};

export type TeamCreateResponse = {
  teamId: number;
  teamName: string;
  members: Member[];
};

export type Team = {
  teamId: number;
  teamName: string;
  teamImageUrl: string;
};

export type Member = {
  memberId: number;
  name: string;
};

export type WorkspaceResponse = {
  workspaceId: number;
  workspaceName: string;
  workspaceImageUrl: string;
  workspaceUrl: string;
  invitePassword: string;
  defaultTeamId: number;
};

export type MyProfileResponse = {
  memberId: number;
  name: string;
  email: string;
  profileImageUrl: string;
};

export type MyProfileImageResponse = {
  memberId: number;
  profileImageUrl: string;
};
