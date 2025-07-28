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
