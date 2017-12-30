import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {User} from 'firebase/app';

export interface CommonState {
  user: User | null;
}

export const selectCommon = (state: AppState) => state.common;

export const selectUser = createSelector(selectCommon, (state: CommonState) => state.user);
