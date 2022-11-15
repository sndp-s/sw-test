import React from 'react';
import client from '../../client';
import ProductContext from '../contexts/ProductContext';
import { getProductsQueryFor } from '../queries/products';
class ProductProvider extends React.Component {

  constructor() {
    super();
    // this.setProductCategory = this.setProductCategory.bind(this);
    this.getProductsFor = this.getProductsFor.bind(this);
    this.state = {
      products: [],
      // productCategory: null,
    }
  }

  // setProductCategory(category) {
  //   this.setState((_state) => ({ ..._state, productCategory: category }));
  // }

  async getProductsFor(category) {
    const query = getProductsQueryFor(category);
    try {
      const response = await client.query({ query });
      this.setState({
        products: response.data.category.products,
      });
    } catch (error) {
      console.error('ERROR :: failed to fetch \'products\' ::');
      console.error(error);
    }
  }

  async componentDidUpdate(prevProps) {

  }

  render() {
    // const value = { ...this.state, setProductCategory: this.setProductCategory };
    const value = { ...this.state, getProductsFor: this.getProductsFor };
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