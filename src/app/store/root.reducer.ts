import {commonReducer} from './common/common.reducer';
import {settingsReducer} from './settings/settings.reducer';
import {dataReducer} from './data/data.reducer';

export const rootReducer = {
  common: commonReducer,
  data: dataReducer,
  settings: settingsReducer
};
