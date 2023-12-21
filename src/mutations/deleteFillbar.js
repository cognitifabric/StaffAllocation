import { gql } from '@apollo/client';

export default gql`
mutation deleteFillbar($allocation: FillBarInputType, $userID: ID!, $deleteId: ID!) {
  deleteFillbar(allocation: $allocation, userID: $userID, deleteId: $deleteId) {
    id,
    name,
    username,
    role,
    years {
      id,
      year,
      teams {
        id
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
    },
    users {
      id
      username,
      password,
      role,
      parentID
    }
  }
}
`;