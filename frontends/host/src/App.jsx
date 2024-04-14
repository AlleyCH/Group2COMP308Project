import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';

// Lazy-load the RemoteComponent
const RemoteComponent = lazy(() => import('remoteVitalSigns/RemoteComponent'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/dashboard" element={
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <RemoteComponent />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
