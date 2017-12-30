import {Action} from '@ngrx/store';
import {DayData} from '../../models/day-data';


export const enum ActionTypes {
  LOAD_DAYS = '[Data] LOAD_DAYS',
  SET_DAYS = '[Data] SET_DAYS',
  START_DAY = '[Data] START_DAY',
  ADD_PAUSE = '[Data] ADD_PAUSE',
  STOP_DAY = '[Data] STOP_DAY',
  DELETE_DAY = '[Data] DELETE_DAY',
  DELETE_PAUSE = '[Data] DELETE_PAUSE'
}

export class LoadDays implements Action {
  readonly type = ActionTypes.LOAD_DAYS;
}

export class SetDays implements Action {
  readonly type = ActionTypes.SET_DAYS;

  constructor(public payload: {days: DayData[]}) {}
}

export class StartDay implements Action {
  readonly type = ActionTypes.START_DAY;

  constructor(public payload: {startDate: Date}) {}
}

export class AddPause implements Action {
  readonly type = ActionTypes.ADD_PAUSE;

  constructor(public payload: {id: number; pause: number}) {}
}

export class StopDay implements Action {
  readonly type = ActionTypes.STOP_DAY;

  constructor(public payload: {id: number; stopDate: Date}) {}
}

export class DeleteDay implements Action {
  readonly type = ActionTypes.DELETE_DAY;

  constructor(public payload: {id: number}) {}
}

export class DeletePause implements Action {
  readonly type = ActionTypes.DELETE_PAUSE;

  constructor(public payload: {id: number; index: number}) {}
}

export type All
  = SetDays
  | LoadDays
  | StartDay
  | AddPause
  | StopDay
  | DeleteDay
  | DeletePause;
