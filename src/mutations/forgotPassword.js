import { gql } from '@apollo/client';

export default gql`
mutation forgotPassword($username: String!) {
  forgotPassword(username: $username) {
    message
  }
}
`;