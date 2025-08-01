export type TeamListResponse = {
  teamId: number;
  name: string;
  profileUrl: string;
  memberCount: number;
  createdAt: string;
};

export type MemberListResponse = {
  memberId: number;
  email: string;
  name: string;
  profileUrl: string;
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
  teamProfileUrl: string;
};

export type Member = {
  memberId: number;
  memberName: string;
};

export type Workspace = {
  workspaceId: number;
  name: string;
  profileUrl: string;
  workspaceUrl: string;
  defaultTeamId: number;
};

export type MyProfile = {
  memberId: number;
  name: string;
  email: string;
  profileImage: string;
};

export type MyProfileImage = {
  memberId: number;
  imageUrl: string;
};
