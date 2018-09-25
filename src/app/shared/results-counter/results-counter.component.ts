import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-results-counter',
  templateUrl: './results-counter.component.html',
  styleUrls: ['./results-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsCounterComponent implements OnInit {

  @Input() public data: any[];

  constructor() { }

  ngOnInit() {
  }

  dameNumLanzamientos = () => {
    console.log('Pasamos por dameNumLanzamientos');
    if (this.data) {
      return this.data.length;
    } else {
      return 0;
    }
  }

}
