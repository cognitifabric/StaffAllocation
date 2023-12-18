import { gql } from '@apollo/client';

export default gql`
mutation UpdateAllocation($allocationID: ID!, $userID: ID!, $allocation: FillBarInputType!) {
  updateAllocation(allocationID: $allocationID, userID: $userID, allocation: $allocation) {
    id
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