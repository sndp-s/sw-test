import React from 'react';
import PropTypes from 'prop-types';
import CartContext from '../../state/contexts/CartContext';
import emptyCart from '../../../assets/empty-cart.svg';
import Price from '../../atoms/Price/Price';
import { withRouter } from 'react-router-dom';

import './ProductListing.scss';


class AddToCart extends React.Component {
  static contextType = CartContext;
  
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = ({ id, attributes }) => {
    const chooseAttributes = attributes.map((a) => {
      const _a = { ...a };
      delete _a.items;
      _a.item = a.items[0];
      return _a;
    })
    
    const cartItem = { id, attributes: chooseAttributes };
    this.context.add(cartItem);
  }

  render() {
    const { product } = this.props;
    return (
      <button
        className="add-to-cart"
        onClick = {(evt) => {
          evt.stopPropagation();
          this.handleOnClick(product);
        }}
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

class ProductListing extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div
        className={['listing', (!product.inStock ? 'listing--out-of-stock' : '')].join(' ')}
        onClick={(ev) => {
          this.props.history.push('/product/' + product.id)
        }}
      >
        <div className="img-and-btn-wrapper">
          <div className='img-wrapper'>
            <img src={product.gallery[0]} alt={product.name} />
          </div>
          {product.inStock && <AddToCart product={product}/>}
        </div>
        <div className='details'>
          <div className='details__name'>{product.brand}{' '}{product.name}</div>
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

export default withRouter(ProductListing);
