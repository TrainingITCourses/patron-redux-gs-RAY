import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GlobalStore } from './../../store/global-store.state';
import { ChangeCriteria } from './../../store/global-store.actions';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCriteriaComponent implements OnInit {
  
  constructor(private globalStore: GlobalStore) { }
 
  ngOnInit() {
  }

  onChange = (event) => {
    this.globalStore.dispatch(new ChangeCriteria( event.srcElement.value ));
  }

}
