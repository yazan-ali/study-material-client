import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AuthProvider } from './components/userContext';
import { setContext } from "@apollo/client/link/context";
import Routes from './routes/routes';

const httpLink = createHttpLink({
  uri: 'https://ancient-inlet-09851.herokuapp.com/'
  // uri: "http://localhost:5000/"
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