import { gql } from '@apollo/client';

export default gql`
mutation AddTeam($id: ID!, $team: String!) {
  addTeam(id: $id, team: $team) {
    id,
    year
  }
}
`;