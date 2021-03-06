import {Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {AppState} from '../../store/app.state';
import {Store} from '@ngrx/store';
import {selectAllData} from '../../store/data/data.state';
import {Subscription, combineLatest, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {DayData} from '../../models/day-data';

import * as d3 from 'd3';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('statchart')
  chartElem: ElementRef;

  private readonly AXIS_PADDING = 20;

  endDate: Date;
  startDate: Date;

  dateChange: BehaviorSubject<{start: Date; end: Date}>;

  avgHours = 0;


  chartWidth = 1920;
  chartHeight = 1080;

  chartXScale: any;
  chartYScale: any;

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

        // const labels = values.map(day => `${day.startDate.getDay()}/${day.startDate.getMonth() + 1}`);
        const chartData = values.map((day, index) => ({x: index, y: millis[index] / (60 * 60 * 1000)}));


        // Get the svg box
        const svg = d3.select(this.chartElem.nativeElement);

        // Update scale
        this.chartXScale.domain([0, chartData.length]); // TODO impl
        this.chartYScale.domain([Math.max(...chartData.map(v => v.y)), 0]); // TODO impl

        // Define line
        const lineGen = d3.area<{x: number, y: number}>()
          .x(d => this.chartXScale(d.x))
          .y(this.chartHeight - this.AXIS_PADDING * 2).y1(d => this.chartYScale(d.y));

        svg.select('.area').remove();
        svg.select('.dots').remove();
        svg
          // .select('path')
          .append('path')
          .attr('class', `area`)
          .attr('transform', `translate(${this.AXIS_PADDING}, 0)`)
          .attr('fill', 'rgba(33, 149, 243, 0.205)')
          .attr('stroke', '#2196F3')
          .attr('stroke-width', '5px')
          .datum(chartData)
          .attr('d', lineGen);

        // Add the scatterplot
        svg
          .selectAll('.dots')
          // .append('g')
          // .attr('class', 'dots')
          .data(chartData)
          .enter()
          .append('circle')
          .attr('transform', `translate(${this.AXIS_PADDING}, 0)`)
          .attr('r', 25)
          .style('fill', '#FFD600')
          .attr('stroke', '#FBC02D')
          .attr('stroke-width', '8px')
          .attr('cx', d => this.chartXScale(d.x))
          .attr('cy', d => this.chartYScale(d.y));

        // svg.transition(); // TODO update axis

        this.cd.detectChanges();
      });

  }


  initChart() {
    const margin = 20;

    // Get the svg box
    const svg = d3.select(this.chartElem.nativeElement);

    // Create scales
    this.chartXScale = d3.scaleLinear().domain([0, 10]).range([0 + margin, this.chartWidth - margin]);
    this.chartYScale = d3.scaleLinear().domain([10, 0]).range([0 + margin, this.chartHeight - margin]);
    // Create axis
    const xAxis = d3.axisBottom(this.chartXScale);
    const yAxis = d3.axisLeft(this.chartYScale);

    svg.append('g')
      .attr('transform', `translate(0, ${this.chartHeight - this.AXIS_PADDING * 2})`)
      .style('font-size', '34px')
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${this.AXIS_PADDING * 2}, 0)`)
      .style('font-size', '34px')
      .call(yAxis);

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
