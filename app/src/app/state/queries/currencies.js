import { gql } from '@apollo/client';

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