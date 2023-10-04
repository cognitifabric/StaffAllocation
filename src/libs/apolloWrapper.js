"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { createUploadLink } from 'apollo-upload-client';


const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {"Apollo-Require-Preflight": "true"}
  });

  const uploadLinkHTTP = createUploadLink({
    uri: GRAPHQL_ENDPOINT, // Your GraphQL server URL
    headers: {"Apollo-Require-Preflight": "true"}
  });

  const uploadLink = new ApolloLink((operation, forward) => {
    if (operation.variables && operation.variables.file) {
      const formData = new FormData();
      formData.append('file', operation.variables.file);
      operation.setContext({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
    }
    return forward(operation);
  });

  return new NextSSRApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new NextSSRInMemoryCache({
      addTypename: false,
      include: 'active'
    }),
    dataIdFromObject: o => o.id,
    link: ApolloLink.from([uploadLink, httpLink])
      // typeof window === "undefined"
      //   ? (ApolloLink.from([
      //       // in a SSR environment, if you use multipart features like
      //       // @defer, you need to decide how to handle these.
      //       // This strips all interfaces with a `@defer` directive from your queries.
      //       new SSRMultipartLink({
      //         stripDefer: true,
      //       }),
      //       uploadLink,
      //     ])
      //     )
      //   : uploadLinkHTTP,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
