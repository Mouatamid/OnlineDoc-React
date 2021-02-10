import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/js/script.js';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
