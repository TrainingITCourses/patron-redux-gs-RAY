import { eCriteria } from './../../shared/search-criteria/search-criteria-enum';

export interface Global {
  agencies: any[];
  typesStatus: any[];
  typesMissions: any[];

  criteria: eCriteria;
  idValue: number;
}

export const globalInitialState: Global = {
  agencies: [],
  typesStatus: [],
  typesMissions: [],
  criteria: eCriteria.Estado,
  idValue: 0
};