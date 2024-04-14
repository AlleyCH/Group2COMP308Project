import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import VitalSignsForm from './components/VitalSignsForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/add-vital-signs" element={<VitalSignsForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
