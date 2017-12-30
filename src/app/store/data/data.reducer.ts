import {DataState, dataAdapter} from './data.state';
import {ActionTypes, All} from './data.actions';

const initialState: DataState = dataAdapter.getInitialState({
  last: null
});

export function dataReducer(state: DataState = initialState, action: All): DataState {

  switch (action.type) {

    case ActionTypes.SET_DAYS: {
      return dataAdapter.addAll(action.payload.days, dataAdapter.removeAll(state));
    }

    case ActionTypes.START_DAY:
      return dataAdapter.addOne({startDate: action.payload.startDate, pauses: []}, state);

    case ActionTypes.ADD_PAUSE: {
      const pauses = state.entities[action.payload.id].pauses;
      return dataAdapter.updateOne({id: action.payload.id, changes: {pauses: [...pauses, action.payload.pause]}}, state);
    }

    case ActionTypes.STOP_DAY:
      return dataAdapter.updateOne({id: action.payload.id, changes: {stopDate: action.payload.stopDate}}, state);

    case ActionTypes.DELETE_DAY:
      return dataAdapter.removeOne(action.payload.id, state);

    case ActionTypes.DELETE_PAUSE: {
      const pauses = state.entities[action.payload.id].pauses.filter((pause, index) => index !== action.payload.index);
      return dataAdapter.updateOne({id: action.payload.id, changes: {pauses}}, state);
    }

    default:
      return state;
  }
}

