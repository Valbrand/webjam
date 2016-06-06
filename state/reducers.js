import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

import { actionTypes } from './actions.js';

const oscillators = (state = List(), action) => {
  switch (action.type) {
    case actionTypes.ADD_OSCILLATOR:
      return state.push(Map({
        x: action.x,
        y: action.y,
      }));
    case actionTypes.REMOVE_OSCILLATOR:
      return state.remove(action.oscillatorIndex);
    case actionTypes.MOVE_OSCILLATOR:
      const index = action.oscillatorIndex;

      return state.set(
        index,
        state.get(index).merge({
          x: action.x,
          y: action.y,
        })
      );
    default:
      return state;
  }
}

const webJam = combineReducers({
  oscillators,
});

export default webJam;
