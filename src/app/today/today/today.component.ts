import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {style, trigger, state, transition, animate} from '@angular/animations';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {Subscription} from 'rxjs';
import {selectAllData} from '../../store/data/data.state';
import {DayData, DayDataUtils} from '../../models/day-data';
import {NewDay, EditDay} from '../../store/data/data.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterLeave', [
      state('in', style({opacity: 1})),
      transition('void => *', [style({opacity: 0}), animate(300)]),
      transition('* => void', [animate(300, style({opacity: 0}))])
    ]),
    trigger('fromDown', [
      transition('void => *', [style({transform: 'translateY(100%)'}), animate('300ms ease-out')]),
      transition('* => void', [style({transform: 'translateY(100%)'}), animate('300ms ease-out')]),
    ]),
    trigger('appear', [
      transition('void => *', [style({opacity: 0, transform: 'scale(0.5)'}), animate('300ms ease-in')]),
    ])
  ]
})
export class TodayComponent implements OnInit, OnDestroy {

  private readonly REC_PAUSE_KEY = 'rec_pause';

  currentDay: DayData | null = null;

  recPauseDate: Date | null = null;

  startHours = new Date().getHours();
  startMinutes = new Date().getMinutes();
  pauseValue = 10;

  private subscr: Subscription;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const today = new Date().getDate();

    this.subscr = this.store.select(selectAllData).pipe(
      map(days => days[days.length - 1])
    ).subscribe(lastDay => {
      this.currentDay = (lastDay && today === lastDay.startDate.getDate()) ? lastDay : null;
      this.cd.detectChanges();
    });

    const recPauseVal = localStorage.getItem(this.REC_PAUSE_KEY);
    this.recPauseDate = recPauseVal ? new Date(parseInt(recPauseVal, 10)) : null;
  }

  onStart() {
    const startDate = new Date();
    startDate.setHours(this.startHours);
    startDate.setMinutes(this.startMinutes);

    this.store.dispatch(new NewDay(DayDataUtils.create(startDate)));
  }

  onAddPause(pause: number) {
    if (this.currentDay) {
      this.store.dispatch(new EditDay(DayDataUtils.addPause(this.currentDay, pause)));
    }
  }

  onRemovePause(index: number) {
    if (this.currentDay) {
      this.store.dispatch(new EditDay(DayDataUtils.removePause(this.currentDay, index)));
    }
  }

  onStop() {
    if (this.currentDay) {
      this.store.dispatch(new EditDay(DayDataUtils.stop(this.currentDay, new Date())));
    }
  }

  toggleRecPause() {
    if (!this.recPauseDate) {
      this.recPauseDate = new Date();
      localStorage.setItem(this.REC_PAUSE_KEY, `${this.recPauseDate.getTime()}`);
    } else {
      this.pauseValue = Math.round((new Date().getTime() - this.recPauseDate.getTime()) / (60 * 1000));
      this.recPauseDate = null;
      localStorage.removeItem(this.REC_PAUSE_KEY);
    }
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
