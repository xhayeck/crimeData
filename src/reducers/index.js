import {combineReducers} from 'redux';
import soughtCrimes from './crimeReducer.js';
import ranges from './rangeReducer.js';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  soughtCrimes,
  ranges,
  routing: routerReducer
});

 export default rootReducer;
