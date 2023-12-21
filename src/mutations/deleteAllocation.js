import { gql } from '@apollo/client';

export default gql`
mutation deleteAllocation($allocation: FillBarInputType, $userID: ID! ) {
  deleteAllocation(allocation: $allocation, userID: $userID ) {
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