import { gql } from '@apollo/client';

export default gql`
mutation AddSettings($teamID: String!, $settings: [SettingInputType!]!) {
  addSettings(teamID: $teamID, settings: $settings) {
    id
    type
    order
    content,
    color
  }
}
`;