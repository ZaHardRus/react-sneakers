import React from 'react';
import './index.scss';
import App from './App';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import 'macro-css'


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);