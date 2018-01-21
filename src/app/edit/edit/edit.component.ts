import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators/map';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {DayData, DayDataUtils} from '../../models/day-data';
import {AppState} from '../../store/app.state';
import {selectDataEntities} from '../../store/data/data.state';
import {switchMap} from 'rxjs/operators/switchMap';
import {Subscription} from 'rxjs/Subscription';
import {DeleteDay, EditDay} from '../../store/data/data.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit, OnDestroy {

  day: DayData | null = null;

  private subscr: Subscription;

  constructor(private location: Location, private route: ActivatedRoute, private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {

    this.subscr = this.route.params.pipe(
      map(param => param['dayId']),
      switchMap(dayId => this.store.select(selectDataEntities).pipe(
        map(dict => dict[dayId])
      ))
    ).subscribe(day => {
      this.day = day;
      this.cd.detectChanges();
    });
  }

  onCancel() {
    this.location.back();
  }

  onConfirm() {
    if (this.day) {
      this.store.dispatch(new EditDay(this.day));
      this.location.back();
    }
  }

  onDelete() {
    if (this.day) {
      const sure = confirm(
        `Delete day ${this.day.startDate.getDate()}/${this.day.startDate.getMonth() + 1}/${this.day.startDate.getFullYear()}?`
      );
      if (sure) {
        this.store.dispatch(new DeleteDay({id: this.day.id}));
        this.location.back();
      }
    }
  }


  onDateChange(type: 'start' | 'stop', time: 'h' | 'm', value: string) {
    const v = coerceNumberProperty(value);

    if (this.day) {

      if (type === 'start') {
        const start = new Date(this.day.startDate);
        time === 'h' ? (start.setHours(v)) : (start.setMinutes(v));

        this.day = DayDataUtils.start(this.day, start);

      } else if (type === 'stop') {

        if (this.day.stopDate) {
          const stop = new Date(this.day.stopDate);
          time === 'h' ? (stop.setHours(v)) : (stop.setMinutes(v));

          this.day = DayDataUtils.stop(this.day, stop);
        }

      }
    }
  }

  onAddPause(pause: number) {
    if (this.day) {
      this.day = DayDataUtils.addPause(this.day, pause);
    }
  }

  onRemovePause(index: number) {
    if (this.day) {
      this.day = DayDataUtils.removePause(this.day, index);
    }
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
