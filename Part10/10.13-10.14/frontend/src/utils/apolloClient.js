import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.expoConfig.extra.apolloUri,  // Use ENV variable
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;