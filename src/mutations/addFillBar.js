import { gql } from '@apollo/client';

export default gql`
mutation AddFillBarToAllocation($allocationID: ID!, $allocation: FillBarInputType!, $userID: ID!, $pickedContainer: FillBarInputType!) {
  addFillBarToAllocation(allocationID: $allocationID, allocation: $allocation, userID: $userID, pickedContainer: $pickedContainer ) {
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