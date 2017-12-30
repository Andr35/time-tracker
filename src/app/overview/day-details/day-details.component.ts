import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {DayData} from '../../models/day-data';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayDetailsComponent{

  @Input()
  day: DayData;

  @Output()
  removeDay: EventEmitter<DayData> = new EventEmitter();

  calcSpan(): Date | null {
    if (!this.day || !this.day.stopDate) {
      return null;
    }
    const d = new Date(this.day.stopDate.getTime() - this.day.startDate.getTime());
    this.day.pauses.forEach(p => d.setMinutes(d.getMinutes() - p));
    return d;
  }

}
