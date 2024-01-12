import { gql } from '@apollo/client';

export default gql`
mutation UpdateYear($id: ID!, $year: String!) {
  updateYear(id: $id, year: $year) {
    id
  }
}
`;