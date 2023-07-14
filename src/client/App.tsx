import React from 'react';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import { AppStateProvider } from './app-state';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default App;