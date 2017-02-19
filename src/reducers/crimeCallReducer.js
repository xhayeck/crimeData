import initialState from './initialState.js';
import * as types from '../actions/actionTypes.js';

export default function crimeCall(state = initialState.newCrimeCall, action) { //reducer to let redux know api call has been made
  switch(action.type) {
    case types.TRUE_CRIME_CALL:
      return action.truth;
    case types.FALSE_CRIME_CALL:
      return action.truth;
    default:
      return state;
  }
}
