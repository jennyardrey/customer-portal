import { createRoot } from 'react-dom/client';
import App from './client/App';
import React from 'react';
import { AppStateProvider } from './app-state';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AppStateProvider>
    <App />
    </AppStateProvider>
  </React.StrictMode>
);
