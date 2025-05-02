import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NetworkMap from './pages/NetworkMap';
import DeviceManager from './pages/DeviceManager';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import { NetworkDataProvider } from './context/NetworkDataContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <NetworkDataProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="network-map" element={<NetworkMap />} />
                <Route path="devices" element={<DeviceManager />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </NetworkDataProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;