import {combineReducers} from 'redux';
import soughtCrimes from './crimeReducer.js';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  soughtCrimes,
  routing: routerReducer
});

 export default rootReducer;
