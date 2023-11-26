import { gql } from '@apollo/client';

export default gql`
mutation activateAccount($password: String!, $token: String!) {
  activateAccount(password: $password, token: $token) {
    message
  }
}
`;