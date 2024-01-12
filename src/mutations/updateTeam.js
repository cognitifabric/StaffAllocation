import { gql } from '@apollo/client';

export default gql`
mutation updateTeam($id: ID!, $team: String!) {
  updateTeam(id: $id, team: $team) {
    id
  }
}
`;