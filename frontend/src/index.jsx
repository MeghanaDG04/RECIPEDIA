import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react'

// errors will be sent to sentry dashboard
// Sentry.init({
//   dsn: 'https://8894f23615782158c8d943136006af75@o4509950480809984.ingest.us.sentry.io/4509950489395200',
//   integrations: [new Sentry.browserTracingIntegration()],
//   tracesSampleRate: 0.2,    // monitor performance
//   sendDefaultPii: false,   // Personally Identifiable Information
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
