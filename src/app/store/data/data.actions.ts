import {Action} from '@ngrx/store';
import {DayData} from '../../models/day-data';


export const enum ActionTypes {
  LOAD_DAYS = '[Data] LOAD_DAYS',
  SET_DAYS = '[Data] SET_DAYS',
  NEW_DAY = '[Data] NEW_DAY',
  EDIT_DAY = '[Data] EDIT_DAY',
  DELETE_DAY = '[Data] DELETE_DAY'
}

export class LoadDays implements Action {
  readonly type = ActionTypes.LOAD_DAYS;
}

export class SetDays implements Action {
  readonly type = ActionTypes.SET_DAYS;

  constructor(public payload: {days: DayData[]}) {}
}

export class NewDay implements Action {
  readonly type = ActionTypes.NEW_DAY;

  constructor(public payload: DayData) {}
}

export class EditDay implements Action {
  readonly type = ActionTypes.EDIT_DAY;

  constructor(public payload: DayData) {}
}

export class DeleteDay implements Action {
  readonly type = ActionTypes.DELETE_DAY;

  constructor(public payload: {id: string}) {}
}

export type All
  = SetDays
  | LoadDays
  | NewDay
  | DeleteDay
  | EditDay;
