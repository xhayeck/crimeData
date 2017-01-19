require('isomorphic-fetch');
import * as types from './actionTypes.js';

export function requestCrime(locDatDis) {
  return {type: types.FETCH_CRIME_STATS, locDatDis};
}

export function getCrime(info) {
  //call the backend
  return dispatch => {
    dispatch(requestCrime(info));
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return fetch('/api/crimeSearch/getCrime', {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify(info)
    })
      .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(crimes) {
        console.log('jsonResponse: ', crimes);
      });
    };
}
