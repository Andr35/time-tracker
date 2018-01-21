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

    case ActionTypes.NEW_DAY:
      return dataAdapter.addOne(action.payload, state);

    case ActionTypes.EDIT_DAY: {
      return dataAdapter.updateOne({id: action.payload.id, changes: action.payload}, state);
    }

    case ActionTypes.DELETE_DAY:
      return dataAdapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}

