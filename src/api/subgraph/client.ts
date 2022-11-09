import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'

export const apolloClient: ApolloClient<NormalizedCacheObject> =
  new ApolloClient({
    cache: new InMemoryCache({}),
    uri: process.env.REACT_APP_SUBGRAPH_API_URL
  })
