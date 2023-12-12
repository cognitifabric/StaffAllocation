import { gql } from '@apollo/client';

export default gql`
mutation UpdateEntityUser($id: ID!, $username: String!, $role: String!) {
  updateEntityUser(id: $id, username: $username, role: $role) {
    id
    username,
    password,
    role,
    parentID
  }
}
`;