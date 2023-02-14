import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import TooltipHelper from "./helpers/tipHelper.js";

TooltipHelper.activateTooltip();
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));

reportWebVitals();
