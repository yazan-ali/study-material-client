import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AuthProvider } from './components/userContext';
import { setContext } from "@apollo/client/link/context";
import Routes from './routes/routes';

const httpLink = createHttpLink({
  uri: 'https://tranquil-harbor-97714.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;