import {SettingsState} from './settings.state';
import {/*ActionTypes,*/ All} from './settings.actions';

const initialState: SettingsState = {
  setting: false
};

export function settingsReducer(state: SettingsState = initialState, action: All): SettingsState {

  switch (action.type) {
    default:
      return state;
  }
}

