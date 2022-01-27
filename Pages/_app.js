import "../scss/main.scss";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, newtworkErrors }) => {
  graphqlErrors &&
    graphqlErrors?.map(({ message, location, path }) => {
      console.log(`Graphql error ${message}`);
    });
});
const apiKey = process.env.NEXT_PUBLIC_GQL_API_TOKEN;

const httpLink = from([
  errorLink,
  new HttpLink({
    uri: "https://api.apito.io/secured/graphql",
  }),
]);

const authLink = setContext((_, { headers }) => {
  const token = apiKey;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

console.log({ client });

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
