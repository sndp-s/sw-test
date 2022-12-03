import { gql } from 'graphql-request';

export const getCurrenciesQuery = () => {
  const query = gql`
  {
    currencies {
      label
      symbol
    }
  }`;
  return query;
}