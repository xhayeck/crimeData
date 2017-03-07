import * as types from './actionTypes.js';

export function showInfo(info) {
  return {type: types.CITY_INFO_LOAD, info};
}

export function updateCityShow(infoShow) {
  return dispatch => {
    dispatch(showInfo(infoShow));
  };
}
