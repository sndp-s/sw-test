import React from 'react';

import Grid from '../../atoms/grid/Grid';
import ProductListing from '../../molecules/product-listing/ProductListing';

import { withCurrency } from '../../state/providers/CurrencyProvider';
import { withCategory } from '../../state/providers/CategoryProvider';

import PLPContext from '../../state/contexts/PLPContext';
import products__all from './dummy_data/products__all.json';


class ProductListingPage extends React.Component {
  static contextType = PLPContext;
  render() {
    // const { products } = this.props
    console.log('PLP context :: ', this.props);
    const { products } = products__all.data.category;
    return (
      <div>
        <h1>Category name</h1>
        <Grid>
          {products ? (
            products.map((p) => <ProductListing product={p}/>)
          ) : null}
        </Grid>
      </div>
    )
  }
}

export default withCategory(withCurrency(ProductListingPage));