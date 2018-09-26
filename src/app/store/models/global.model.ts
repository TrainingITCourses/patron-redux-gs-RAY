export interface Global {
  agencies: any[];
  typesStatus: any[];
  typesMissions: any[];

  criteria: string;
  idValue: number;
}

export const globalInitialState: Global = {
  agencies: [],
  typesStatus: [],
  typesMissions: [],
  criteria: '',
  idValue: 0
};