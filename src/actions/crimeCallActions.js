import * as types from './actionTypes.js';

export function trueCrimeCall(truth) {
  return {type: types.TRUE_CRIME_CALL, truth};
}

export function falseCrimeCall(truth) {
  return {type: types.FALSE_CRIME_CALL, truth};
}

export function crimeCall(truth) {
  return dispatch => {
    if(truth) {
      dispatch(trueCrimeCall(truth));
    }
    if(!truth) {
      dispatch(falseCrimeCall(truth));
    }
  };
}
