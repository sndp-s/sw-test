import React from 'react';
import PropTypes from 'prop-types';
import CurrencyContext from '../../state/contexts/CurrencyContext';
import emptyCart from '../../../assets/empty-cart.svg';

import './ProductListing.scss';


class AddToCart extends React.Component {
  
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = (product) => {
    
    const cartItem = product.attributes.map((attribute) => {
      const choosenAttribute = { ...attribute };
      delete choosenAttribute.items;
      choosenAttribute.item = attribute.items[0];
      return choosenAttribute;
    })

    // RESUME HERE 
    // the cardItem is prepared above
    // add it to the cartProvider
  }

  render() {
    const { product } = this.props;
    return (
      <button
        className="add-to-cart"
        onClick = {(evt) => { this.handleOnClick(product); }}
      >
        <img
          src={emptyCart}
          alt="add to cart button"
          className="add-to-cart__image"
        />
      </button>
    )
  }
}

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
      <div className={['listing',
        (!product.inStock ? 'listing--out-of-stock' : '')].join(' ')
      }>
        <div className='img-wrapper'>
          <img src={product.gallery[0]} alt={product.name} />
        </div>
        {product.inStock && (
          <div className='add-to-cart-btn-wrapper'>
            <AddToCart product={product}/>
          </div>
        )}
        <div className='details'>
          <div className='details__name'>{product.name}</div>
          <Price prices={product.prices} />
        </div>
        {!product.inStock && (
          <div className='out-of-stock-modal'>
            <p className='out-of-stock-modal__text'>OUT OF STOCK</p>
          </div>
        )}
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
