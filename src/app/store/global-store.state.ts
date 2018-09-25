import { Global, globalInitialState } from './models/global.model';
import { GlobalActionTypes, GlobalActions } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  private state: Global = { ...globalInitialState };

  private agencies$ = new BehaviorSubject<any>(this.state.agencies);
  private typesStatus$ = new BehaviorSubject<any>(this.state.typesStatus);
  private typesMissions$ = new BehaviorSubject<any>(this.state.typesMissions);
 
  constructor() { }
  
  public dispatch = (action: GlobalActions) => {
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.loadAgencies:
        this.agencies$.next([ ...this.state.agencies ]);
        break;
      case GlobalActionTypes.loadTypesStatus:
        this.typesStatus$.next([ ...this.state.typesStatus ]);
        break;
      case GlobalActionTypes.loadTypesMissions:
        this.typesMissions$.next([ ...this.state.typesMissions ]);
        break;
    }
  };
  
  public getSnapshot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.agencies:
        return [ ...this.state.agencies ];
      case GlobalSlideTypes.typesStatus:
        return [ ...this.state.typesStatus ];
      case GlobalSlideTypes.typesMissions:
        return [ ...this.state.typesMissions ];
    }
  };

  public select$ = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.agencies:
        return this.agencies$.asObservable();
      case GlobalSlideTypes.typesStatus:
        return this.typesStatus$.asObservable();
      case GlobalSlideTypes.typesMissions:
        return this.typesMissions$.asObservable();
    }
  };
}

export enum GlobalSlideTypes {
  agencies = 'Agencias',
  typesStatus = 'Tipos de estado',
  typesMissions = 'Tipos de misión'
}