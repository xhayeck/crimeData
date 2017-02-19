import * as types from './actionTypes.js';

export function initialFilterLoading(initialLoad) {
  return {type: types.INITIAL_FILTER_LOADING, initialLoad};
}

export function initialLoad(initialfilter) {
  return dispatch => {
    dispatch(initialFilterLoading(initialfilter));
  };
}
