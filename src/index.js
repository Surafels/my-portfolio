import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <GoogleAnalyticsTracker />
      <App />
    </React.StrictMode>
    ,
  </BrowserRouter>,
);
