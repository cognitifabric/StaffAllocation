import { gql } from '@apollo/client';

export default gql`
query User($id: ID!) {
  users(id: $id){
    id
    username
    role
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
}
`