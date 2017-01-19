import {combineReducers} from 'redux';
import crime from './crimeReducer.js';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  crime,
  routing: routerReducer
});

 export default rootReducer;
