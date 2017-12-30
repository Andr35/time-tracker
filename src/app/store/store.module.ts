import {environment} from '../../environments/environment';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule as NgRxStoreModule, ActionReducer} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {CommonEffects} from './common/common.effects';
import {SettingsEffects} from './settings/settings.effects';
import {rootReducer} from './root.reducer';
import {DataEffects} from './data/data.effects';

@NgModule({
  imports: [

    NgRxStoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([CommonEffects, DataEffects, SettingsEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 50})
  ]
})
export class StoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }
}

/**
 * NgRx MetaReducer to be used with HMR feature.
 *
 * @export
 * @param {ActionReducer<any>} reducer
 * @returns {ActionReducer<any>}
 */
export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

