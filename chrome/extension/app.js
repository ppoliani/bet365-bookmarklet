import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/Root';
import './app.css';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  ReactDOM.render(
    <Root />,
    document.querySelector('#root')
  );
});
