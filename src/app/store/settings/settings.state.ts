import {AppState} from '../app.state';

export interface SettingsState {
  setting: boolean;
}

export const selectSettings = (state: AppState) => state.settings;
