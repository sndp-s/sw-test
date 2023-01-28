import React from 'react';
import './CartDropdown.scss';
import EmptyCartBlack from '../../../assets/outlined/empty-cart-black.svg';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import CartContext from '../../state/contexts/CartContext';
import Menu from './CartMenu';
import Text from '../../atoms/Text/Text';
import BlackDotImg from '../../../assets/filled/black-dot.png';

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
        render={<Menu onClose={this.onClose}/>}
        renderPosition='bottom-left'
      >
        <button className='head' onClick={this.handleOnToggle}>
          <div className="head__content">
            <img src={EmptyCartBlack} alt="cart icon" />
            <Text
              className="head__content__cart-count"
              size='xs'
              weight={700}
              span
            >
              {cart.length ?? 0}
            </Text>
          </div>
        </button>
      </Dropdown>
    );
  }
}

export default CartDropdown;