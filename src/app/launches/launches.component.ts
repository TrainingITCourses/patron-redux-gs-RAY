import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GlobalStore, GlobalSlideTypes } from './../store/global-store.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchesComponent implements OnInit {

  constructor(private globalStore: GlobalStore) { }

  private launches$: Observable<any>;

  ngOnInit() {
    this.launches$ =  this.globalStore.select$( GlobalSlideTypes.launchesFilter );
  }

}
