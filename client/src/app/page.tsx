import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql', // Replace with actual GraphQL endpoint
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
