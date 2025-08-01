import type { TeamListResponse } from '../../types/setting';

export type Team = Pick<TeamListResponse, 'teamId' | 'name' | 'profileUrl'>;
