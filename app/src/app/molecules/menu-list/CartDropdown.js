import React from 'react';
import './CartDropdown.scss';
import EmptyCartBlack from '../../../assets/outlined/empty-cart-black.svg';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import CartContext from '../../state/contexts/CartContext';
import Menu from './CartMenu';

class CartDropdown extends React.Component {
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
        render={<Menu/>}
        renderPosition='bottom-left'
      >
        <button className='head' onClick={this.handleOnToggle}>
          <img src={EmptyCartBlack} alt="cart icon" />
          {/* <p className="cart-item-count">{cart.length ?? 0}</p> */}
        </button>
      </Dropdown>
    );
  }
}

export default CartDropdown;