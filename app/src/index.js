import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import CurrencyProvider from './app/state/providers/CurrencyProvider';
import CategoryProvider from './app/state/providers/CategoryProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </CategoryProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
