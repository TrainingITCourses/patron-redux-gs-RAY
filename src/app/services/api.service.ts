import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { GlobalStore } from '../store/global-store.state';
import { LoadAgencies, LoadTypesStatus, LoadTypesMissions } from '../store/global-store.actions';

@Injectable({providedIn: 'root'})
export class ApiService {


  constructor(
    private httpClient: HttpClient,
    private globalStore: GlobalStore) { }

  public getData = () => {
    forkJoin(
      this.getAgencies(),
      this.getTypesStatus(),
      this.getTypesMissions()
    )
    .subscribe(( [res1, res2, res3] ) => {
      this.globalStore.dispatch(new LoadAgencies( res1.agencies ));
      this.globalStore.dispatch(new LoadTypesStatus( res2.types ));
      this.globalStore.dispatch(new LoadTypesMissions( res3.types ));
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