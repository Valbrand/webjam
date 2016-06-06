/*
 * action types
 */

export const actionTypes = {
  ADD_OSCILLATOR: 'ADD_OSCILLATOR',
  REMOVE_OSCILLATOR: 'REMOVE_OSCILLATOR',
  MOVE_OSCILLATOR: 'MOVE_OSCILLATOR',
};

/*
 * action creators
 */

export const addOscillator = (x, y) => {
  return {
    type: actionTypes.ADD_OSCILLATOR,
    x,
    y,
  }
}

export const removeOscillator = (oscillatorIndex) => {
  return {
    type: actionTypes.REMOVE_OSCILLATOR,
    oscillatorIndex,
  }
}

export const moveOscillator = (oscillatorIndex, x, y) => {
  return {
    type: actionTypes.MOVE_OSCILLATOR,
    oscillatorIndex,
    x,
    y,
  };
}
