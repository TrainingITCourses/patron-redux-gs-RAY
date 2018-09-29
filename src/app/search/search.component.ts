import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { GlobalStore, GlobalSlideTypes } from './../store/global-store.state';
import { eCriteria } from './../shared/search-criteria/search-criteria-enum';
import { SetLaunchesFilter } from './../store/global-store.actions';
import { Launch } from '../store/models/global.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private api : ApiService, 
              private globalStore : GlobalStore) { }

  private _numLaunches: number;

  ngOnInit() {
    this.api.getData();

    this.globalStore.select$( GlobalSlideTypes.idValue )
      .subscribe( idValue => this.onChangeValue(idValue) );
  }
 
  onChangeValue = (idValue: number) => {
    console.log('onChangeValue: ' + idValue + ' con criterio ' + <eCriteria>this.globalStore.getSnapshot( GlobalSlideTypes.criteria ));

    this.globalStore.select$( GlobalSlideTypes.launches )
      .subscribe((launches: Launch[]) => {
        const launchesFilter: Launch[] = launches.filter((launch: any) => 
          {
            let valido = false;
            switch (<eCriteria>this.globalStore.getSnapshot( GlobalSlideTypes.criteria )) {
              case eCriteria.Agencia:
                valido = launch.agencie == idValue;
                break;
              case eCriteria.Estado:
                valido = launch.status == idValue;
                break;
              case eCriteria.Tipo:
                valido = launch.typeMission == idValue;
                break;
            }
            return valido;
          }
        );
        this.globalStore.dispatch(new SetLaunchesFilter( launchesFilter ));
        this._numLaunches = <number>this.globalStore.getSnapshot ( GlobalSlideTypes.numLaunches );
      })
  }

}
