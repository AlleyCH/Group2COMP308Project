import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

import Dashboard from './components/dashboard';
import VitalSignsForm from './components/VitalSignsForm';
import DisplayMotivationalTips from './components/DisplayMotivationalTips'; 
import AddMotivationalTip from './components/AddMotivationalTip'; 

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-vital-signs" element={<VitalSignsForm />} />
          <Route path="/tips" element={<DisplayMotivationalTips />} />
          <Route path="/add-tip" element={<AddMotivationalTip />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
