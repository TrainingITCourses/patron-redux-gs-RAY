import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { GlobalStore } from '../store/global-store.state';
import { LoadAgencies, LoadTypesStatus, LoadTypesMissions } from '../store/global-store.actions';

@Injectable()
export class ApiService {


  constructor(
    private httpClient: HttpClient,
    private globalStore: GlobalStore) {

    forkJoin(
      this.getAgencies(),
      this.getTypesStatus(),
      this.getTypesMissions()
    )
    .subscribe(( [agencies, typesStatus, typesMissions] ) => {
      globalStore.dispatch(new LoadAgencies( agencies ));
      globalStore.dispatch(new LoadTypesStatus( typesStatus ));
      globalStore.dispatch(new LoadTypesMissions( typesMissions ));
    })
  }
  
  private getAgencies = () : Observable<any> => 
  this.httpClient.get("../../assets/launchagencies.json");

  private getTypesStatus = () : Observable<any> => 
    this.httpClient.get("../../assets/launchstatus.json");

  private getTypesMissions = () : Observable<any> => 
    this.httpClient.get("../../assets/launchmissions.json");

  public getLaunches = (criteria: string, id: number) : Observable<any[]> => 
    this.httpClient
      .get("../../assets/launchlibrary.json")
      .pipe(map((res: any) => res.launches.filter(launch => {
        let valido = false;
        switch (criteria) {
          case 'Agencia':
            if (launch.rocket.agencies) {
              if (launch.rocket.agencies.length > 0) {
                valido = launch.rocket.agencies[0].id == id;
              }
            }
            break;
          case 'Estado':
            valido = launch.status == id;
            break;
          case 'Tipo':
            if (launch.missions.length > 0) {
              valido = launch.missions[0].type == id;
            }
            break;
        }
        return valido;
      })));

}