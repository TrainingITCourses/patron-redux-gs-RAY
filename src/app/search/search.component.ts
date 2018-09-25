import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ApiService]
})
export class SearchComponent implements OnInit {

  private _criteria: string;
  private _data: any[];
  private _valueId: number
  private _launches: any[];

  constructor(private api : ApiService) { }

  ngOnInit() {}

  onChangeCriteria = (criteria: string) => {
    console.log('onChangeCriteria: ' + criteria);

    this._criteria = criteria;
    this._launches = [];
    switch (criteria) {
      case 'Agencia':
        this.api
          .getAgencies()
          .subscribe((res: any[]) => this._data = res);
        break;
      case 'Estado':
        this.api
          .getTypesStatus()
          .subscribe((res: any[]) => this._data = res);
        break;
      case 'Tipo':
        this.api
          .getTypesMissions()
          .subscribe((res: any[]) => this._data = res);
        break;
      default:
        this._data = [];
        break;
    }
  }

  onChangeValue = (value: number) => {
    console.log('onChangeValue: ' + value);

    this._valueId = value;
    this.api
      .getLaunches(this._criteria, this._valueId)
      .subscribe((res: any[]) => this._launches = res);
  }

}
