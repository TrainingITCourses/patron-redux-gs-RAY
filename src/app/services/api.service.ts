import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  
  public getAgencies = () : Observable<any> => 
    this.httpClient
      .get("../../assets/launchagencies.json")
      .pipe(map((res: any) => res.agencies));

  public getTypesStatus = () : Observable<any[]> => 
    this.httpClient
      .get("../../assets/launchstatus.json")
      .pipe(map((res: any) => res.types));

  public getTypesMissions = () : Observable<any[]> => 
    this.httpClient
      .get("../../assets/launchmissions.json")
      .pipe(map((res: any) => res.types));

  
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