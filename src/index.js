import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import TipHelper from "./helpers/tipHelper.js";
import AboveHeader from "./components/above-header/AboveHeader";

TipHelper.rel();
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
