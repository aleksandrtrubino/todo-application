import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import App from './App';
import { ErrorComponent } from './components/ErrorComponent';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
      <App />
      </ErrorBoundary>
  </BrowserRouter>
);
