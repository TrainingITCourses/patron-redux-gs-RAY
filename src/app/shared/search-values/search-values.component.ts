import { GlobalSlideTypes, GlobalStore } from './../../store/global-store.state';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChangeidValue } from '../../store/global-store.actions';
import { eCriteria } from './../search-criteria/search-criteria-enum';

@Component({
  selector: 'app-search-values',
  templateUrl: './search-values.component.html',
  styleUrls: ['./search-values.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchValuesComponent implements OnInit {

  public values$: Observable<any>;

  constructor(private globalStore: GlobalStore) { }

  ngOnInit() {
    this.values$ = this.globalStore.select$(GlobalSlideTypes.criteria).pipe(
      switchMap((criteria: eCriteria) => {
        console.log('Criterio: ' + criteria);
        switch (criteria) {
          case eCriteria.Agencia:
            return this.globalStore.select$(GlobalSlideTypes.agencies);
          case eCriteria.Estado:
            return this.globalStore.select$(GlobalSlideTypes.typesStatus);
          case eCriteria.Tipo:
            return this.globalStore.select$(GlobalSlideTypes.typesMissions);
        }
      })
    );
  }

  onChange = (event) => {
    this.globalStore.dispatch(new ChangeidValue( +event.srcElement.value ));
  }

}
