import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/js/script.js';
import axios from 'axios';

axios.defaults.baseURL = "http://35.193.152.73:8082";
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers['Accept'] = 'application/json; charset=utf-8';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
