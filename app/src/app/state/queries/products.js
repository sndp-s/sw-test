import { gql } from '@apollo/client';

export const getProductsQueryFor = (category) => {
  const query = gql`
  {
    category(input: { title: "${category}" }) {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }`;
  
  return query;
}