import { GlobalSlideTypes, GlobalStore } from './../../store/global-store.state';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-values',
  templateUrl: './search-values.component.html',
  styleUrls: ['./search-values.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchValuesComponent implements OnInit {

  // @Input() public data: any[];
  @Output() public value = new EventEmitter<number>();

  public values$: Observable<any>;

  constructor(private globalStore: GlobalStore) { }

  ngOnInit() {
    // this.values$ = this.globalStore.select$(GlobalSlideTypes.agencies);
    this.globalStore.select$(GlobalSlideTypes.criteria)
      .subscribe(criteria =>

      // this.values$ = this.globalStore.select$(GlobalSlideTypes.agencies));

      {
        switch (criteria) {
          case 'Agencia':
            console.log('onChangeCriteria1: ' + criteria);
            this.values$ = this.globalStore.select$(GlobalSlideTypes.agencies);
            break;
          case 'Estado':
            console.log('onChangeCriteria2: ' + criteria);
            this.values$ = this.globalStore.select$(GlobalSlideTypes.typesStatus);
            break;
          case 'Tipo':
            console.log('onChangeCriteria3: ' + criteria);
            this.values$ = this.globalStore.select$(GlobalSlideTypes.typesMissions);
            break;
        }
        return this.values$;
      });
  }

  onChangeCriteria = (criteria: string): Observable<any> => {
    console.log('onChangeCriteria: ' + criteria);

    switch (criteria) {
      case 'Agencia':
        return this.globalStore.select$(GlobalSlideTypes.agencies);
      case 'Estado':
        return this.globalStore.select$(GlobalSlideTypes.typesStatus);
      case 'Tipo':
        return this.globalStore.select$(GlobalSlideTypes.typesMissions);
    }
  }

  onChange = (event) => {
    console.log('onChange - values');
    this.value.next(+event.srcElement.value);
  }

  dameData = () => {
    console.log('dameData - values');
    // return this.data;
  }

}
