import React from 'react';
import Grid from '../../atoms/grid/Grid';
import ProductListing from './ProductListing';
import client from '../../client';
import { getProductsQueryFor } from '../../state/queries/products';

class ProductGrid extends React.Component {
  constructor() {
    super();
    
    this.state = {
      products: [],
    };
  }

  updateProducts() {

  }

  async fetchProducts(category) {
    const query = getProductsQueryFor(category);
    try {
      const response = await client.query({ query });
      this.setState({
        products: (response.data.category?.products) ?? null,
      });
    } catch (error) {
      console.error('ERROR :: failed to fetch \'products\' ::');
      console.error(error);
    }
  }

  componentDidMount() {
    // console.log('DEBUG :: MOUNT :: ', this.props);

    const { category } = this.props;
    this.fetchProducts(category);
  }

  componentDidUpdate(prevProps) {
    // console.log('DEBUG :: UPDATE :: ', this.props);

    const { category: prevCategory } = prevProps;
    const { category } = this.props;

    if (prevCategory !== category) {
      this.fetchProducts(category);
    }
  }

  render() {
    const { products } = this.state;
    return (
      <Grid>
        {products ? (
          products.map((p) => <ProductListing product={p} key={p.id} />)
        ) : null}
      </Grid>
    );
  }
}

export default ProductGrid;