import { gql } from '@apollo/client';

export default gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    username
    role,
    token
  }
}
`;