import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes.js';
import configureStore from './store/configureStore';
// import {loadCrimes} from './actions/crimeActions.js';
import {syncHistoryWithStore} from 'react-router-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css';
import '../node_modules/react-table/react-table.css';
import './styles/index.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
// store.dispatch(loadCrimes());
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
