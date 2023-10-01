import { gql } from '@apollo/client';

export default gql`
mutation AddSettings($userID: String!, $settings: [SettingInputType!]!) {
  addSettings(userId: $userID, settings: $settings) {
    id
    type
    order
    content
  }
}
`;