import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';
// import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import client from "./graphql/client";

// const client = new ApolloClient({
//     link: new HttpLink({
//         uri: 'https://inspired-osprey-80.hasura.app/v1/graphql',
//         headers: { 'x-hasura-admin-secret': process.env.REACT_APP_TESTING }
//     }),
//     cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>
    </ApolloProvider>
);