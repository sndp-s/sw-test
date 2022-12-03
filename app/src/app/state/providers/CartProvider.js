import React from 'react';
import CartContext from '../contexts/CartContext';

class CartProvider extends React.Component {
  constructor() {
    super();
    this.checkItemsMatch = this.checkItemsMatch.bind(this);
    this.checkAttributesMatch = this.checkAttributesMatch.bind(this);
    this.normaliseCart = this.normaliseCart.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.state = {
      cart: [],
      normalisedCart: [],
    }
  }

  checkItemsMatch(item1, item2) {
    const itemPropertiesKeys = Object.keys(item1);
      for (let i = 0; i < itemPropertiesKeys.length; i++) {
        const key = itemPropertiesKeys[i];
        if (item1[key] !== item2[key]) return false;
      }
    return true;
  };
  
  checkAttributesMatch(p1, p2) {
    const p1Attributes = p1.attributes;
    const p2Attributes = p2.attributes;
    
    if (p1Attributes.length !== p2Attributes.length) {
      return false;
    }

    for (let i = 0; i < p1.length; i++) {
      const toCheckP1Attribute = p1Attributes[i];
      const toCheckP2Attribute = p2Attributes.find((p2Attribute) => (
        p2Attribute.id === toCheckP1Attribute.id
      ));

      if (!toCheckP2Attribute) return false;

      const itemsMatchFlag = this.checkItemsMatch(toCheckP1Attribute, toCheckP2Attribute);

      if(!itemsMatchFlag) return false;
    }

    return true;
  }

  normaliseCart() {
    const { cart } = this.state;
    const _normalisedCart = [];

    cart.forEach((cartItem) => {
      const iItemInNormalisedCart = _normalisedCart.findIndex((_normalisedCartItem) => {
        // Check if IDs match
        const doProductIdsMatch = cartItem.id === _normalisedCartItem.id;
        if (!doProductIdsMatch) return false;

        // Check if Attributes match
        const attributesMatchFlag = this.checkAttributesMatch(cartItem, _normalisedCartItem);
        if(!attributesMatchFlag) return false;

        return true;
      })

      if (iItemInNormalisedCart !== -1) {
        _normalisedCart[iItemInNormalisedCart].count += 1;
      } else {
        _normalisedCart.push({
          ...cartItem,
          count: 1,
        });
      }
    });

    this.setState((_state) => ({
      cart: _state.cart,
      normalisedCart: _normalisedCart,
    }));
  }

  add(product) {
    if (this.state.cart.length === 0) {
      this.setState({
        cart: [product],
        normalisedCart: [],
      });
    } else {
      this.setState((_state) => ({
        cart: [..._state.cart, product],
        normalisedCart: [..._state.normalisedCart],
      }));
    }
  }

  remove(toRemoveProduct) {
    if (this.state.cart.length === 0) return;

    const { cart } = this.state;
    const _cart = [...cart];

    const removeIndex = cart.findIndex((cartItem) => {
      if (cartItem.id !== toRemoveProduct.id) return false;  
      const attributesMatchFlag = this.checkAttributesMatch(cartItem, toRemoveProduct);
      if (attributesMatchFlag) return true;
      else return false;
    });

    if (removeIndex > -1) {
      _cart.splice(removeIndex, 1);
      this.setState({
        cart: _cart,
        normalisedCart: [],
      })
    }
  }

  // async componentDidMount() { console.log('INFO :: CART Mounted :: ', this.state); }

  async componentDidUpdate(prevProps, prevState) {
    console.log('INFO :: CART UPDATED :: ', this.state);
    if (prevState.cart.length !== this.state.cart.length) {
      this.normaliseCart();
    }
  }

  render() {
    const value = {...this.state, add: this.add, remove: this.remove};
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