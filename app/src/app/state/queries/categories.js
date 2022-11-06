import { gql } from '@apollo/client';

export const getCategoriesQuery = () => {
  const query = gql`
  {
    categories {
      name
    }
  }`;
  return query;
}