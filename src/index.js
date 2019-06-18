import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './services/gotService';
import './services/gotBook';
import './services/gotHouse';

ReactDOM.render(<App />, document.getElementById('root'));

