import {Component, ChangeDetectionStrategy, Input, Optional} from '@angular/core';
import {DayData} from '../../models/day-data';
import {OverviewComponent} from '../overview/overview.component';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayDetailsComponent {

  @Input()
  day: DayData;

  constructor( @Optional() private parent: OverviewComponent) {}

  onEdit() {
    if (this.parent) {
      this.parent.onEditDay(this.day);
    }
  }

  onDelete() {
    if (this.parent) {
      this.parent.onRemoveDay(this.day);
    }
  }

  calcSpan(): Date | null {
    if (!this.day || !this.day.stopDate) {
      return null;
    }
    const d = new Date(this.day.stopDate.getTime() - this.day.startDate.getTime());
    this.day.pauses.forEach(p => d.setMinutes(d.getMinutes() - p));
    return d;
  }

}
