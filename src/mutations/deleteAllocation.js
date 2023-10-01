import { gql } from '@apollo/client';

export default gql`
mutation deleteAllocation($allocation: FillBarInputType, $userID: ID!, $deleteId: ID!) {
  deleteAllocation(allocation: $allocation, userID: $userID, deleteId: $deleteId) {
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