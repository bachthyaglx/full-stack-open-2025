import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const useMe = () => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { me: data?.me, loading, refetch };
};

// Change to named export
export { useMe as default };
