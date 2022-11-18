import React from 'react';
import CartContext from '../contexts/CartContext';
import client from '../../client';

class CartProvider extends React.Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      cart: [],
    }
  }

  addToCart(item) {
    this.setState((_state) => ({ cart: [..._state.cart, item] }))
  }

  async componentDidMount() { console.log('INFO :: CART Mounted :: ', this.state); }

  async componentDidUpdate() { console.log('INFO :: CART UPDATED :: ', this.state); }

  render() {
    const value = {...this.state, addToCart: this.addToCart};
    return (
      <CartContext.Provider value={value}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}


export const withCart = (Child) => (props) => (
  <CartContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </CartContext.Consumer>
)

export default CartProvider;