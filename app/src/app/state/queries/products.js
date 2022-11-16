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
        attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
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