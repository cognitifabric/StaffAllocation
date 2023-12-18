import { gql } from '@apollo/client';

export default gql`
mutation uploadAllocation($userID: ID!, $teamID: ID!, $allocations: [AllocationOutputType!]!) {
  uploadAllocation(userID: $userID, teamID: $teamID, allocations: $allocations){
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