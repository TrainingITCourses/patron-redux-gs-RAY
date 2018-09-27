import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../services/api.service';
import { GlobalStore, GlobalSlideTypes } from './../store/global-store.state';
import { eCriteria } from './../shared/search-criteria/search-criteria-enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private api : ApiService, 
              private globalStore : GlobalStore) { }

  ngOnInit() {
    this.api.getData();

    this.globalStore.select$( GlobalSlideTypes.idValue )
      .subscribe( idValue => this.onChangeValue(idValue) )
  }
 
  onChangeValue = (idValue: number) => {
    console.log('onChangeValue: ' + idValue);
    this.api
      .getLaunches(<eCriteria>this.globalStore.getSnapshot( GlobalSlideTypes.criteria ) , idValue)
      .subscribe((res: any[]) => this._launches = res);
  }

}
