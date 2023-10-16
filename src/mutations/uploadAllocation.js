import { gql } from '@apollo/client';

export default gql`
mutation uploadAllocation($userId: ID!, $allocations: [AllocationOutputType!]!) {
  uploadAllocation(userId: $userId, allocations: $allocations){
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