import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { Global, globalInitialState } from './models/global.model';

export function globalStoreReducer( state = globalInitialState, action: GlobalActions ): Global {
  const result = { ...state };
 
  switch (action.type) {
    case GlobalActionTypes.loadAgencies:
      result.agencies = action.payload;
      break;
    case GlobalActionTypes.loadTypesStatus:
      result.typesStatus = action.payload;
      break;
    case GlobalActionTypes.loadTypesMissions:
      result.typesMissions = action.payload;
      break;
    case GlobalActionTypes.changeCriteria:
      result.criteria = action.payload;
      break;
    case GlobalActionTypes.changeidValue:
      result.idValue = action.payload;
      break;
  }
 
  return result;
}