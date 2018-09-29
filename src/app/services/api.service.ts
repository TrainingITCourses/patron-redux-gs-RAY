import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GlobalStore } from '../store/global-store.state';
import { LoadAgencies, LoadTypesStatus, LoadTypesMissions, LoadLaunches } from '../store/global-store.actions';

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private globalStore: GlobalStore) { }

  public getData = () => {
    forkJoin(
      this.getAgencies(),
      this.getTypesStatus(),
      this.getTypesMissions(),
      this.getLaunches()
    )
    .subscribe(( res: any[] ) => {
      this.globalStore.dispatch(new LoadAgencies( 
        res[0].agencies.map(agencie => ({
          id: agencie.id, 
          name: agencie.name
        }))
      ));

      this.globalStore.dispatch(new LoadTypesStatus( 
        res[1].types.map(typeStatus => ({
          id: typeStatus.id,
          name: typeStatus.description
        }))
      ));

      this.globalStore.dispatch(new LoadTypesMissions( 
        res[2].types.map(typeMission => ({
          id: typeMission.id,
          name: typeMission.name
        }))
      ));

      // https://programandoointentandolo.com/2017/07/estructuras-condicionales-java.html
      // Operador terniario
      this.globalStore.dispatch(new LoadLaunches(
        res[3].launches.map(launch => ({
          id: launch.id,
          name: launch.name,
          agencie: launch.rocket.agencies ? launch.rocket.agencies.length > 0 ? launch.rocket.agencies[0].id : 0: 0,
          status: launch.status,
          typeMission: launch.missions.length > 0 ? launch.missions[0].type : 0,
        }))
      ));
    })
  }
  
  private getAgencies = () : Observable<any> => 
    this.httpClient.get('../../assets/launchagencies.json');

  private getTypesStatus = () : Observable<any> => 
    this.httpClient.get('../../assets/launchstatus.json');

  private getTypesMissions = () : Observable<any> => 
    this.httpClient.get('../../assets/launchmissions.json');

  private getLaunches = () : Observable<any> => 
    this.httpClient.get('../../assets/launchlibrary.json');

}