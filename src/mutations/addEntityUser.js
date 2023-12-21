import { gql } from '@apollo/client';

export default gql`
mutation AddEntityUser($id: ID!, $username: String!, $role: String!) {
  addEntityUser(id: $id, username: $username, role: $role) {
    id,
    name,
    username,
    role,
    years {
      year,
      teams {
        team,
        allocations {
          id
          order
          fte
          text
          allocation 
          color
          fillBars {
            id
            order
            fte
            text
            allocation 
          }
        }
        settings {
          id
          type
          order
          content
          color
        }
      }
    }
  }
}
`;