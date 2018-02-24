import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {DayData} from '../../models/day-data';
import {AppState} from '../../store/app.state';
import {selectAllData} from '../../store/data/data.state';
import {Observable} from 'rxjs/Observable';
import {DeleteDay} from '../../store/data/data.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fromDown', [
      transition('void => *', [
        query('.day', style({transform: 'translateY(100vh)', opacity: 0})),
        query('.day', stagger('100ms', [
          style({transform: 'translateY(100vh)', opacity: 0}),
          animate('500ms ease-in')
        ])),
      ]),
      transition('* => void', [style({transform: 'translateY(100%)'}), animate('2s ease-out')]),
    ])
  ]

})
export class OverviewComponent implements OnInit {

  days$: Observable<DayData[]>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.days$ = this.store.select(selectAllData);
  }

  onRemoveDay(day: DayData) {
    const sure = confirm(`Delete day ${day.startDate.getDate()}/${day.startDate.getMonth() + 1}/${day.startDate.getFullYear()}?`);
    if (sure) {
      this.store.dispatch(new DeleteDay({id: day.id}));
    }
  }

  onEditDay(day: DayData) {
    this.router.navigate(['edit', day.id]);
  }

}
