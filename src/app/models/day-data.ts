export interface DayData {
  readonly id: string;
  readonly startDate: Date;
  readonly pauses: number[];
  readonly stopDate?: Date;
}

export class DayDataUtils {

  static create(startDate: Date): DayData {
    return {
      id: `${startDate.getTime()}`,
      startDate,
      pauses: []
    };
  }

  static start(day: DayData, startDate: Date): DayData {
    return {
      ...day,
      startDate
    };
  }

  static stop(day: DayData, stopDate: Date): DayData {
    return {
      ...day,
      stopDate
    };
  }

  static addPause(day: DayData, pause: number): DayData {
    return {
      ...day,
      pauses: [...day.pauses, pause]
    };
  }

  static removePause(day: DayData, index: number): DayData {
    const pauses = [...day.pauses];
    pauses.splice(index, 1);
    return {...day, pauses};
  }

}
