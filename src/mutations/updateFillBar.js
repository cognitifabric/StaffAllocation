import { gql } from '@apollo/client';

export default gql`
mutation UpdateFillBar($allocationID: ID!, $fillBars: [FillBarInputType!]!, $userID: ID!, $fillBar: FillBarInputType!) {
  updateFillBar(allocationID: $allocationID, fillBars: $fillBars, userID: $userID, fillBar: $fillBar) {
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