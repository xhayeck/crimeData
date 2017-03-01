import * as types from './actionTypes.js';

export function initialFilterLoading(initialLoad) {
  return {type: types.INITIAL_FILTER_LOADING, initialLoad};
}

export function filteredCrime(filteredCrime) {
  return {type: types.FILTER_CRIMES, filteredCrime};
}

export function initialLoad(initialfilter) {
  return dispatch => {
    dispatch(initialFilterLoading(initialfilter));
  };
}

export function filteringCrime(filtered) {
  return dispatch => {
    dispatch(filteredCrime(filtered));
  };
}
