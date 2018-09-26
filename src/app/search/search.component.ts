import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../services/api.service';
import { GlobalStore, GlobalSlideTypes } from './../store/global-store.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  private _launches: any[];
  public values$: Observable<any>;

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
      .getLaunches(<string>this.globalStore.getSnapshot( GlobalSlideTypes.criteria ) , idValue)
      .subscribe((res: any[]) => this._launches = res);
  }

}
