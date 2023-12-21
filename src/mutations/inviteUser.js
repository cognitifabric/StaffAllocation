import { gql } from '@apollo/client';

export default gql`
mutation inviteUser($name: String!, $username: String!, $role: String!) {
  inviteUser(name: $name, username: $username, role: $role) {
    message
  }
}
`;