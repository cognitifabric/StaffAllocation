import { gql } from '@apollo/client';

export default gql`
mutation uploadAllocation($file: FileUploadInputType!) {
  uploadAllocation(file: $file){
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