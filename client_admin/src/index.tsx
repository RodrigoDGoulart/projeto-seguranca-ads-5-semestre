import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import { ContextoProvider } from './contexts/Contexto';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextoProvider>
      <App />
    </ContextoProvider>
  </React.StrictMode>
);
