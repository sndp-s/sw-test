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

export const getCategoryNameQuery = (category) => {
  if (!category) return null;

  return gql`{
    category(input: { title: "${category}"}) {
      name
    }
  }`;
}