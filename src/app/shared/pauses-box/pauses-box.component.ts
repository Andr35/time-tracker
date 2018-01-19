import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {DayData} from '../../models/day-data';

@Component({
  selector: 'app-pauses-box',
  templateUrl: './pauses-box.component.html',
  styleUrls: ['./pauses-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PausesBoxComponent {

  @Input()
  day: DayData;

  @Input()
  set pauseValue(value: number) {
    this._pauseValue = value;
  }

  @Output()
  addPause: EventEmitter<number> = new EventEmitter();

  @Output()
  removePause: EventEmitter<number> = new EventEmitter();

  _pauseValue = 10;
}
