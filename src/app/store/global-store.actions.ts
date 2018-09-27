import { eCriteria } from './../shared/search-criteria/search-criteria-enum';

export enum GlobalActionTypes {
   loadAgencies,
   loadTypesStatus,
   loadTypesMissions,
   changeCriteria,
   changeidValue
 }
 
 export interface Action {
   readonly type: GlobalActionTypes;
   readonly payload?: any;
 }
 
 export class LoadAgencies implements Action {
   public type = GlobalActionTypes.loadAgencies;
   constructor (public readonly payload?: any) {}
 }
 
 export class LoadTypesStatus implements Action {
   public type = GlobalActionTypes.loadTypesStatus;
   constructor (public readonly payload?: any) {}
 }
 
 export class LoadTypesMissions implements Action {
   public type = GlobalActionTypes.loadTypesMissions;
   constructor (public readonly payload?: any) {}
 }

 export class ChangeCriteria implements Action {
   public type = GlobalActionTypes.changeCriteria;
   constructor (public readonly payload?: eCriteria) {}
 }

 export class ChangeidValue implements Action {
  public type = GlobalActionTypes.changeidValue;
  constructor (public readonly payload?: number) {}
}
 
 export type GlobalActions = LoadAgencies | LoadTypesStatus | LoadTypesMissions | ChangeCriteria | ChangeidValue;