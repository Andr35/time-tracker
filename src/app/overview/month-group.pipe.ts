import {Pipe, PipeTransform} from '@angular/core';
import {DayData} from '../models/day-data';

@Pipe({
  name: 'monthGroup'
})
export class MonthGroupPipe implements PipeTransform {

  transform(value: DayData[], args?: any): DayData[][] {
    const newData: DayData[][] = [];
    let lastDay: DayData | null = null;

    value.forEach((day) => {
      if (lastDay && lastDay.startDate.getMonth() === day.startDate.getMonth()) {
        newData[newData.length - 1].push(day);
      } else {
        newData.push([day]);
      }
      lastDay = day;
    });

    return newData;
  }

}
