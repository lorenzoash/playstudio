import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import App from './pages/App/App';


render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));

