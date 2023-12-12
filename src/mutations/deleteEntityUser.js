import { gql } from '@apollo/client';

export default gql`
mutation DeleteEntityUser($id: ID!) {
  deleteEntityUser(id: $id) {
    id
    username,
    password,
    role,
    parentID
  }
}
`;