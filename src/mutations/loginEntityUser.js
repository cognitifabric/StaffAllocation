import { gql } from '@apollo/client';

export default gql`
mutation loginEntityUser($username: String!, $password: String!) {
  loginEntityUser(username: $username, password: $password) {
    id
    username
    role,
    token
  }
}
`;