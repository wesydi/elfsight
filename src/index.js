import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import galleryReducers from './reducers/galleryReducers';
import 'normalize.css';
import './index.scss';
import App from './App';

const store = createStore(galleryReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
