// vitals-app/src/App.jsx
import './App.css';
import VitalsComponent from './VitalsComponent';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql', // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App() {

  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <VitalsComponent />
      </ApolloProvider>
    </div>
  );
}

export default App;
