require('isomorphic-fetch');
import * as types from './actionTypes.js';

// export function loadCrimeStats(crimes) {
//   return {type: types.LOAD_CRIME_STATS};
// }

export function soughtCrimeStats(soughtCrimes) {
  return {type: types.SOUGHT_CRIME_STATS, soughtCrimes};
}

export function locCenter(mapCenter) {
  return {type: types.SEARCH_CENTER, mapCenter};
}

export function getCrime(info) {
  return dispatch => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return fetch('/api/crimeSearch/getCrime', { //call the backend
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
        let coord = crimes.splice(crimes.length - 1, 1);
        console.log('jsonResponse: ', crimes);
        console.log('crimes[1]: ', coord[0]);
        dispatch(soughtCrimeStats(crimes));
        dispatch(locCenter(coord[0]));
      });
    };
}
