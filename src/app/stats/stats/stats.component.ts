import {Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {AppState} from '../../store/app.state';
import {Store} from '@ngrx/store';
import {selectAllData} from '../../store/data/data.state';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map} from 'rxjs/operators/map';

import * as Chart from 'chart.js';
import {DayData} from '../../models/day-data';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('statchart')
  chartElem: ElementRef;

  chart: Chart;

  endDate: Date;
  startDate: Date;

  dateChange: BehaviorSubject<{start: Date; end: Date}>;

  avgHours = 0;

  private dataSubscr: Subscription;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 1);

    this.dateChange = new BehaviorSubject({start: this.startDate, end: this.endDate});
  }

  ngAfterViewInit() {

    this.initChart();

    this.dataSubscr = combineLatest(this.store.select(selectAllData), this.dateChange).pipe(
      map(([data, {start, end}]) => data.filter(day => (day.startDate > start && (day.stopDate || new Date()) < end)))
    )
      .subscribe((values) => {

        const millis = values.map(day => this.millisInADay(day));

        this.avgHours = values.length > 0 ? millis.reduce((a, b) => a + b) / values.length : 0;

        const labels = values.map(day => `${day.startDate.getDay()}/${day.startDate.getMonth() + 1}`);
        const chartData = values.map((day, index) => ({x: index, y: millis[index] / (60 * 60 * 1000)}));

        this.chart.data.labels = labels;
        (this.chart.data.datasets || [{}])[0].data = chartData;

        this.chart.update();

        this.cd.detectChanges();
      });

  }


  initChart() {
    this.chart = new Chart(this.chartElem.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Hours',
          data: [],
          backgroundColor: 'rgba(19, 125, 243, 0.2)',
          borderColor: 'rgba(19, 125, 243, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: false},
        scales: {
          yAxes: [{
            ticks: {
              max: 12,
              min: 0
            }
          }]
        }
      }
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateChange.next({start: this.startDate, end: this.endDate});
  }

  private millisInADay(day: DayData): number {
    if (!day.stopDate) {
      return 0;
    }
    const d = new Date(day.stopDate.getTime() - day.startDate.getTime());
    day.pauses.forEach(p => d.setMinutes(d.getMinutes() - p));

    return d.getTime();
  }

  ngOnDestroy() {
    this.dateChange.complete();

    if (this.dataSubscr) {
      this.dataSubscr.unsubscribe();
    }
  }
}
