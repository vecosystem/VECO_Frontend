import type { CursorBasedResponse } from './common';

export type Deadline = {
  start: string;
  end: string;
};

export type ManagerInfo = {
  profileUrl: string;
  name: string;
};

export type Manager = {
  cnt: number;
  info: ManagerInfo[];
};

export type External = {
  id: number;
  name: string;
  title: string;
  status?: string;
  priority?: string;
  goaltitle?: string;
  deadline: Deadline | string;
  managers?: Manager;
  extServiceType?: string;
};

export type GroupedExternal = { key: string; items: External[] };

export type ExternalFilter = {
  filterName: string;
  dataCnt: number;
  externals: External[];
};

export type RequestExternalListDto = {
  teamId: string;
  externalIds?: number[];
};

export type ResponseExternalDto = CursorBasedResponse<ExternalFilter[]>;
