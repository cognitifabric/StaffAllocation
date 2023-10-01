import { gql } from '@apollo/client';

export default gql`
mutation UpdateAllocation($allocationID: ID!, $userID: ID!, $allocation: FillBarInputType!) {
  updateAllocation(allocationID: $allocationID, userID: $userID, allocation: $allocation) {
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