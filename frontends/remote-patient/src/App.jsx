import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

import Dashboard from './components/dashboard';
import VitalSignsForm from './components/VitalSignsForm';
import EmergencyAlertForm from './components/EmergencyAlertForm';
import SymptomChecklistForm from './components/SymptomCheckListForm';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-vital-signs" element={<VitalSignsForm />} />
          <Route path="/emergency-alert" element={<EmergencyAlertForm />} /> 
          <Route path="/symptom-checklist" element={<SymptomChecklistForm />} />  
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
