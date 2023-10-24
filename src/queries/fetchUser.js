import { gql } from '@apollo/client';

export default gql`
{
  user(id:"65123ca1b69d3defa682bf2f"){
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