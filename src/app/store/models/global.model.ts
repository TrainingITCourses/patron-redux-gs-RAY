import { eCriteria } from './../../shared/search-criteria/search-criteria-enum';

export interface Global {
  agencies: Agencie[];
  typesStatus: TypeStatus[];
  typesMissions: TypeMission[];
  launches: Launch[];
  launchesFilter: Launch[];
  numberFilter: number;
  criteria: eCriteria;
  idValue: number;
}

export const globalInitialState: Global = {
  agencies: [],
  typesStatus: [],
  typesMissions: [],
  launches: [],
  launchesFilter: [],
  numberFilter: 0,
  criteria: eCriteria.Estado,
  idValue: 0
};

export interface Agencie {
  id: number;
  name: string;
}

export interface TypeMission {
  id: number;
  name: string;
}

export interface TypeStatus {
  id: number;
  name: string;
}

export interface Launch {
  id: number;
  name: string;
  agencie: number;
  status: number;
  typeMision: number;
}