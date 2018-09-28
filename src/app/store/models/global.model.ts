import { eCriteria } from './../../shared/search-criteria/search-criteria-enum';

export interface Global {
  agencies: any[];
  typesStatus: any[];
  typesMissions: any[];
  launches: any[];
  launchesFilter: any[];
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