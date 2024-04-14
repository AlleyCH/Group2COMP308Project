import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
