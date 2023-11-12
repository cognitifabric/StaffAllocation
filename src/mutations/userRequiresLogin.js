import { gql } from '@apollo/client';

export default gql`
mutation userRequiresLogin($userId: ID!, $token: String!) {
  userRequiresLogin(userId: $userId, token: $token) {
    id
    username
    role,
    token
  }
}
`;