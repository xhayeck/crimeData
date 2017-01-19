import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App.js';
import HomePage from './components/home/HomePage.js';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/:address" component={HomePage} />
  </Route>
);
