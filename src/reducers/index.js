import {combineReducers} from 'redux';
import soughtCrimes from './crimeReducer.js';
import ranges from './rangeReducer.js';
import filteredCrimes from './filteredCrimesReducer.js';
import crimeCall from './crimeCallReducer.js';
import mapCenter from './centerReducer.js';
import cityInfo from './cityInfoReducer.js';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  soughtCrimes,
  ranges,
  filteredCrimes,
  crimeCall,
  mapCenter,
  cityInfo,
  routing: routerReducer
});

 export default rootReducer;
