import initialState from './initialState.js';
import * as types from '../actions/actionTypes.js';

export default function cityInfo(state = initialState.cityInfo, action) {
  switch(action.type) {
    case types.CITY_INFO_LOAD:
      return action.info;
    default:
      return state;
  }
}
