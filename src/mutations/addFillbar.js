import { gql } from '@apollo/client';

export default gql`
mutation AddFillBarToAllocation($allocationID: ID!, $allocation: FillBarInputType!, $userID: ID!, $pickedContainer: FillBarInputType!) {
  addFillBarToAllocation(allocationID: $allocationID, allocation: $allocation, userID: $userID, pickedContainer: $pickedContainer ) {
    id
    username
    allocations {
      id
      order
      fte
      text
      allocation 
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
    }
  }
}
`;