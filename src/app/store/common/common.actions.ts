import {Action} from '@ngrx/store';
import {User} from 'firebase/app';


export const enum ActionTypes {
  SET_USER = '[Common] SET_USER'
}

export class SetUser implements Action {
  readonly type = ActionTypes.SET_USER;

  constructor(public payload: User | null) {}
}

export type All
  = SetUser;
