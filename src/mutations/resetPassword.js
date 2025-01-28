import { gql } from '@apollo/client';

export default gql`
mutation resetPassword($password: String!, $token: String!) {
  resetPassword(password: $password, token: $token) {
    message
  }
}
`;