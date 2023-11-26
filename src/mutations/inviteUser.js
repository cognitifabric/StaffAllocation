import { gql } from '@apollo/client';

export default gql`
mutation inviteUser($username: String!, $role: String!) {
  inviteUser(username: $username, role: $role) {
    message
  }
}
`;