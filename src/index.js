import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes.js';
import configureStore from './store/configureStore';
import {syncHistoryWithStore} from 'react-router-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css';
import '../node_modules/react-table/react-table.css';
import './styles/index.css';
import '../node_modules/toastr/build/toastr.min.css';
import ReactGA from 'react-ga';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactGA.initialize(process.env.googleAnalytics);

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.getElementById('app')
);
