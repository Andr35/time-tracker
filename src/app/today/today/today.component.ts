import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {style, trigger, state, transition, animate} from '@angular/animations';
import {AppState} from '../../store/app.state';
import {Subscription} from 'rxjs/Subscription';
import {selectAllData} from '../../store/data/data.state';
import {DayData} from '../../models/day-data';
import {StartDay, StopDay, DeletePause, AddPause} from '../../store/data/data.actions';
import {map} from 'rxjs/operators/map';

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

    this.store.dispatch(new StartDay({startDate}));
  }

  onAddPause() {
    this.store.dispatch(new AddPause({id: this.getCurrentDayId(), pause: this.pauseValue}));
  }

  onRemovePause(index: number) {
    this.store.dispatch(new DeletePause({id: this.getCurrentDayId(), index}));
  }

  onStop() {
    this.store.dispatch(new StopDay({id: this.getCurrentDayId(), stopDate: new Date()}));
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


  private getCurrentDayId(): number {
    if (!this.currentDay) {
      throw new Error('Missing current day');
    }
    return this.currentDay.startDate.getTime();
  }


  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
