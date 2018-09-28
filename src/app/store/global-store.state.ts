import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Global, globalInitialState } from './models/global.model';
import { GlobalActionTypes, GlobalActions } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';
import { eCriteria } from './../shared/search-criteria/search-criteria-enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  private state: Global = { ...globalInitialState };

  private agencies$ = new BehaviorSubject<any>(this.state.agencies);
  private typesStatus$ = new BehaviorSubject<any>(this.state.typesStatus);
  private typesMissions$ = new BehaviorSubject<any>(this.state.typesMissions);
  private launches$ = new BehaviorSubject<any>(this.state.launches);

  private launchesFilter$ = new BehaviorSubject<any>(this.state.launchesFilter);
  
  private criteria$ = new BehaviorSubject<eCriteria>(this.state.criteria);
  private idValue$ = new BehaviorSubject<number>(this.state.idValue);

  constructor() { }
  
  public dispatch = (action: GlobalActions) => {
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.loadAgencies:
        this.agencies$.next( [...this.state.agencies] );
        break;
      case GlobalActionTypes.loadTypesStatus:
        this.typesStatus$.next([ ...this.state.typesStatus ]);
        break;
      case GlobalActionTypes.loadTypesMissions:
        this.typesMissions$.next([ ...this.state.typesMissions ]);
        break;
      case GlobalActionTypes.loadLaunches:
        this.launches$.next([ ...this.state.launches ]);
        break;
      case GlobalActionTypes.setLaunchesFilter:
        this.launchesFilter$.next([ ...this.state.launchesFilter ]);
        break;
      case GlobalActionTypes.changeCriteria:
        let newCriteria = this.state.criteria; // RAY (26/09/18) Al ser un tipo primitivo esta asignación devuelve una copia
        this.criteria$.next( newCriteria );
        break;
      case GlobalActionTypes.changeidValue:
        let newidValue = this.state.idValue; // RAY (26/09/18) Al ser un tipo primitivo esta asignación devuelve una copia
        this.idValue$.next( newidValue );
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
      case GlobalSlideTypes.launches:
        return [ ...this.state.launches ];
      case GlobalSlideTypes.launchesFilter:
        return [ ...this.state.launchesFilter ];
      case GlobalSlideTypes.numLaunches:
        let numberFilter = this.state.numberFilter; // RAY (28/09/18) Al ser un tipo primitivo esta asignación devuelve una copia
        return numberFilter;
      case GlobalSlideTypes.criteria:
        let newCriteria = this.state.criteria; // RAY (26/09/18) Al ser un tipo primitivo esta asignación devuelve una copia
        return newCriteria;
      case GlobalSlideTypes.idValue:
        let newidValue = this.state.idValue; // RAY (26/09/18) Al ser un tipo primitivo esta asignación devuelve una copia
        return newidValue;
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
      case GlobalSlideTypes.launches:
        return this.launches$.asObservable();
      case GlobalSlideTypes.launchesFilter:
        return this.launchesFilter$.asObservable();
      case GlobalSlideTypes.criteria:
        return this.criteria$.asObservable();
      case GlobalSlideTypes.idValue:
        return this.idValue$.asObservable();
    }
  };
}

export enum GlobalSlideTypes {
  agencies = 'Agencias',
  typesStatus = 'Tipos de estado',
  typesMissions = 'Tipos de misión',
  launches = 'Lanzamientos',
  launchesFilter = 'Lanzamientos filtrados',
  numLaunches = 'Número de lanzamientos filtrados',
  criteria = 'Criterio de búsqueda',
  idValue = 'id del valor a buscar'
}
