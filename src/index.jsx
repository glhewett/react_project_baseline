import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';
import AppConnect from './AppConnect.jsx';

let store = createStore(combineReducers(reducers))

ReactDOM.render(
  <Provider store={store}>
    <AppConnect />
  </Provider>,
  document.getElementById('container')
)
