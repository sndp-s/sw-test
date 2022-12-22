import React from 'react';
import client from '../../client';
import ProductContext from '../contexts/ProductContext';
import { getProductsQueryFor } from '../queries/products';
class ProductProvider extends React.Component {

  constructor() {
    super();
    this.getProductsFor = this.getProductsFor.bind(this);
    this.state = { products: [] }
  }

  async getProductsFor(category) {
    const query = getProductsQueryFor(category);
    try {
      const response = await client.request(query);
      this.setState({
        products: response.data.category.products,
      });
    } catch (error) {
      console.error('ERROR :: failed to fetch \'products\' ::');
      console.error(error);
    }
  }

  render() {
    const value = {
      ...this.state,
      getProductsFor: this.getProductsFor,
    };

    return(
      <ProductContext.Provider value={value}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export const withProduct = (Child) => (props) => (
  <ProductContext.Consumer>
    {(context) => <Child {...props} productContext={context} />}
  </ProductContext.Consumer>
)

export default ProductProvider;