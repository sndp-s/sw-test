import React from 'react';
import PropTypes from 'prop-types';

import './ProductListing.scss';

class ProductListing extends React.Component {
  constructor() {
    super();
    
    this.getPrice = this.getPrice.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
    this.state = {
      currenctCurrency: {
        "label": "USD",
        "symbol": "$",
      },
    }
  }
  
  getPrice(prices) {
    const _price = prices.find((p) => p.currency.label === this.state.currenctCurrency.label)
    return _price ?? null;
  }

  renderPrice(prices) {
    const price = this.getPrice(prices)
    if (!price) return null;
    return (
      <div>
        <span>{price.currency.symbol}</span>
        <span>{price.amount}</span>
      </div>
    );
  }

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
          <div className='listing__price'>
            {this.renderPrice(product.prices)}
          </div>
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
// :: DATA ::
// - gallery[0]
// - details
//     - name
// - price
//    - symbol
//    - amount