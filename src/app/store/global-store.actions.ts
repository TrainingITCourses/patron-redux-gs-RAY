export enum GlobalActionTypes {
   loadAgencies,
   loadTypesStatus,
   loadTypesMissions
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
 
 export type GlobalActions = LoadAgencies | LoadTypesStatus | LoadTypesMissions;