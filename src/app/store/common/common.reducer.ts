import {CommonState} from './common.state';
import {ActionTypes, All} from './common.actions';

const initialState: CommonState = {
  user: null
};

export function commonReducer(state: CommonState = initialState, action: All): CommonState {

  switch (action.type) {

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}

