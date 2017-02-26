import initialState from './initialState.js';
import * as types from '../actions/actionTypes.js';

export default function mapCenter(state = initialState.mapCenter, action) {
  switch(action.type) {
    case types.SEARCH_CENTER:
      return action.mapCenter;
    default:
      return state;
  }
}
