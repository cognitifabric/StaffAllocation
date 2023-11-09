import { gql } from '@apollo/client';

export default gql`
mutation createSystemAdmin($username: String!, $password: String!, $role: String!) {
  createSystemAdmin(username: $username, password: $password, role: $role) {
    id
    username,
    password,
    role
  }
}
`;