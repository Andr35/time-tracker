import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators/map';
import {DayData} from '../../models/day-data';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {selectDataEntities} from '../../store/data/data.state';
import {switchMap} from 'rxjs/operators/switchMap';
import {Subscription} from 'rxjs/Subscription';
import {DeleteDay} from '../../store/data/data.actions';

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
    // TODO
  }

  onDelete() {
    if (this.day) {
      const sure = confirm(
        `Delete day ${this.day.startDate.getDate()}/${this.day.startDate.getMonth() + 1}/${this.day.startDate.getFullYear()}?`
      );
      if (sure) {
        this.store.dispatch(new DeleteDay({id: this.day.id}));
      }
    }
  }

  onAddPause() {
    // TODO (create CLASS DayData)
  }

  onRemovePause() {
    // TODO
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
