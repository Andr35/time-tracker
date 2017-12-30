import {CommonState} from './common/common.state';
import {SettingsState} from './settings/settings.state';
import {DataState} from './data/data.state';

export interface AppState {
  readonly common: CommonState;
  readonly data: DataState;
  readonly settings: SettingsState;
}
