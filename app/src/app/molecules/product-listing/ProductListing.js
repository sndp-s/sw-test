import React from 'react';
import PropTypes from 'prop-types';
import CurrencyContext from '../../state/contexts/CurrencyContext';

import './ProductListing.scss';


class Price extends React.Component {
  static contextType = CurrencyContext;

  componentDidMount() {
    if (!this.context.currencies) {
      this.context.loadCurrencies();
    }
  }
  
  render() {
    const { currencies, current } = this.context;
    const { prices } = this.props;

    if (!currencies || !current || !prices) return <div />;
    
    const price = prices.find((p) => (p.currency.label === current.label));

    if (!price) return <div />;

    return (
      <div className='listing__price'>
        <span>{price.currency.symbol}</span>
        <span>{price.amount}</span>
      </div>
    );
  }
}

class ProductListing extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div className='listing'>
        <div className='listing__img-wrapper'>
          <img src={product.gallery[0]} alt={product.name} />
        </div>
        <div className='listing__add-to-card-btn'></div>
        <div className='listing__details'>
          <div className='listing__name'>{product.name}</div>
          <Price prices={product.prices} />
        </div>
      </div>
    )
  }
}


// ProductListing.propTypes = {
//   product: PropTypes.shape({
//     gallery: PropTypes.array.isRequired

//   }),
// }

export default ProductListing;
