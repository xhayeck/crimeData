import initialState from './initialState.js';
import * as types from '../actions/actionTypes.js';

export default function filteredCrimes(state = initialState.filteredCrimes, action) { //set the store for filtered crimes
  switch(action.type) {
    case types.INITIAL_FILTER_LOADING:
      return action.initialLoad;
    case types.FILTER_CRIMES:
      return action.filteredCrime;
    default:
      return state;
  }
}
