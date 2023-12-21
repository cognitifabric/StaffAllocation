import { gql } from '@apollo/client';

export default gql`
mutation AddAllocation($userID: ID!, $teamID: ID!, $order: Int!, $fte: String!, $text: String!, $allocation: String!, $color: String!) {
  addAllocationToUser(userID: $userID, teamID: $teamID, order: $order, fte: $fte, text: $text, allocation: $allocation, color: $color) {
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
`