import { gql } from 'graphql-request';


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

export const getProductQueryFor = (productId) => {
  return gql`
  {
    product(id: "${productId}") {
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
      id
      name
      brand
      description
      inStock
      gallery
      prices {
        currency {
          symbol
          label
        }
        amount
      }
    }
  }`
}
