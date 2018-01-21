import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {DayData} from '../../models/day-data';
import {AppState} from '../app.state';

export interface DataState extends EntityState<DayData> {
  last: DayData | null;
}

export function selectId(data: DayData): string {
  return data.id;
}

export const dataAdapter: EntityAdapter<DayData> = createEntityAdapter<DayData>({selectId});

export const selectData = (state: AppState) => state.data;

export const {
  selectIds: selectDataIds,
  selectEntities: selectDataEntities,
  selectAll: selectAllData,
  selectTotal: selectDataTotal
} = dataAdapter.getSelectors(selectData);

