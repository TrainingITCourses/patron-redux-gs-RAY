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
    .subscribe(( [res1, res2, res3, res4] ) => {
      this.globalStore.dispatch(new LoadAgencies( res1.agencies ));
      this.globalStore.dispatch(new LoadTypesStatus( res2.types ));
      this.globalStore.dispatch(new LoadTypesMissions( res3.types ));
      this.globalStore.dispatch(new LoadLaunches( res4.launches ));
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