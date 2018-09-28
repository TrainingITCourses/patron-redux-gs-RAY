import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Observable } from 'rxjs';
import { GlobalStore, GlobalSlideTypes } from './../store/global-store.state';
import { eCriteria } from './../shared/search-criteria/search-criteria-enum';
import { SetLaunchesFilter } from './../store/global-store.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private api : ApiService, 
              private globalStore : GlobalStore) { }

  private numLaunches: number;

  ngOnInit() {
    this.api.getData();

    this.globalStore.select$( GlobalSlideTypes.idValue )
      .subscribe( idValue => this.onChangeValue(idValue) );
  }
 
  onChangeValue = (idValue: number) => {
    console.log('onChangeValue: ' + idValue + ' con criterio ' + <eCriteria>this.globalStore.getSnapshot( GlobalSlideTypes.criteria ));

    this.globalStore.select$( GlobalSlideTypes.launches )
      .subscribe(launches => {
        const launchesFilter = launches.filter((launch: any) => 
          {
            let valido = false;
            switch (<eCriteria>this.globalStore.getSnapshot( GlobalSlideTypes.criteria )) {
              case eCriteria.Agencia:
                if (launch.rocket.agencies) {
                  if (launch.rocket.agencies.length > 0) {
                    valido = launch.rocket.agencies[0].id == idValue;
                  }
                }
                break;
              case eCriteria.Estado:
                valido = launch.status == idValue;
                break;
              case eCriteria.Tipo:
                if (launch.missions.length > 0) {
                  valido = launch.missions[0].type == idValue;
                }
                break;
            }
            return valido;
          }
        );
        this.globalStore.dispatch(new SetLaunchesFilter( launchesFilter ));
        this.numLaunches = <number>this.globalStore.getSnapshot ( GlobalSlideTypes.numLaunches );
      })
  }

}
