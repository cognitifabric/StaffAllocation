import { gql } from '@apollo/client';

export default gql`
{
  user(id:"654bdfbb38b8af37e526df39"){
    id
    username
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