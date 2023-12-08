import { gql } from '@apollo/client';

export default gql`
mutation activateEntityAccount($password: String!, $token: String!) {
  activateEntityAccount(password: $password, token: $token) {
    message
  }
}
`;