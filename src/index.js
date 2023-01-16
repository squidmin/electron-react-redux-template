import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers';

import VideoInfoScreen from '../src/screens/VideoInfoScreen';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className='app'>
        <Switch>
          <Route path="/" component={VideoInfoScreen} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
