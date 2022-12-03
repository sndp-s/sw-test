import React from 'react';
import './CartMenu.scss';
import EmptyCartBlack from '../../../assets/outlined/empty-cart-black.svg';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import ScrollView from '../../atoms/ScrollView/ScrollView';
import CartItem from '../../atoms/CartItem/CartItem';
import CartContext from '../../state/contexts/CartContext';


class Menu extends React.Component {
  static contextType = CartContext;

  render() {
    const { cart, normalisedCart } = this.context;
    return(
      <div className="menu">
        <div className="heading">
          <p className="heading__text">My Bag, {cart.length ?? 0} items</p>
        </div>
        <div className="product-list">
          <ScrollView hideScroll>
            {normalisedCart.map((product, index) => (
              <CartItem
                item={product}
                key={index}
              />
            ))}
          </ScrollView>
        </div>
      </div>
    );
  }
}



class CartMenu extends React.Component {
  static contextType = CartContext;

  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
    this.handleOnToggle = this.handleOnToggle.bind(this);
    this.state = {
      isOpen: false,
    }
  }

  handleOnToggle(e) {
    this.setState({
      isOpen: !this.state.isOpen,
    }) 
  }

  onClose(e) {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { cart } = this.context;

    return (
        <Dropdown
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          render={<Menu />}
        >
          <button className='head' onClick={this.handleOnToggle}>
            <img src={EmptyCartBlack} alt="cart icon" />
            <p className="cart-item-count">{cart.length ?? 0}</p>
          </button>
        </Dropdown>
    );
  }
}

export default CartMenu;