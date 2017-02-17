import initialState from './initialState.js';
import * as types from '../actions/actionTypes.js';

export default function crimeReducer(state = initialState.soughtCrimes, action) {
  switch(action.type) {
    case types.LOAD_CRIME_STATS:
      return state;
    case types.SOUGHT_CRIME_STATS:
      return action.soughtCrimes;
    default:
      return state;
  }
}
