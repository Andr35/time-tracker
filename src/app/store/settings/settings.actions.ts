import {Action} from '@ngrx/store';

export const enum ActionTypes {
  LOAD_SETTINGS = '[Settings] LOAD_SETTINGS',
  SAVE_SETTINGS = '[Settings] SAVE_SETTINGS'
}

export class LoadSettings implements Action {
  readonly type = ActionTypes.LOAD_SETTINGS;
}

export type All
  = LoadSettings;
