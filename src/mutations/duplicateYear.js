import { gql } from '@apollo/client';

export default gql`
mutation duplicateYear($id: ID!, $yearID: String!) {
  duplicateYear(id: $id, yearID: $yearID) {
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