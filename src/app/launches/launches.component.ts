import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchesComponent implements OnInit {

  @Input() public data: any[];

  constructor() { }

  ngOnInit() {
  }

  dameData = () => {
    console.log('Pasamos por dameData');
    return this.data;
  }

}
