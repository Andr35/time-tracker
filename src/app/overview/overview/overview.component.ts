import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DayData} from '../../models/day-data';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {selectAllData} from '../../store/data/data.state';
import {Observable} from 'rxjs/Observable';
import {DeleteDay} from '../../store/data/data.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {

  days$: Observable<DayData[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.days$ = this.store.select(selectAllData);
  }

  onRemoveDay(day: DayData) {
    this.store.dispatch(new DeleteDay({id: day.startDate.getTime()}));
  }
}
