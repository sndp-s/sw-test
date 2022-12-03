import React from 'react';
import './CartItem.scss';
import Price from '../Price/Price';
import ScrollView from '../ScrollView/ScrollView';
import Attributes from './Attributes';
import client from '../../client';
import { getProductQueryFor } from '../../state/queries/products';
import { withCart } from '../../state/providers/CartProvider';


class CartItem extends React.Component {
  constructor() {
    super();

    this.fetchProduct = this.fetchProduct.bind(this);
    this.state = {
      product: null,
    }
  }

  async fetchProduct(productId) {
    const query = getProductQueryFor(productId);
    try {
      const response = await client.request(query);
      this.setState({
        product: (response.product) ?? null,
      });
    } catch (error) {
      console.error(`ERROR :: failed to fetch 'product' ${productId}`);
      console.error(error);
    }
  }

  componentDidMount() {
    this.fetchProduct(this.props.item.id);
  }

  componentDidUpdate(prevProps) {
    const { item: prevItem } = prevProps;
    const { item } = this.props;

    if (prevItem !== item) this.fetchProduct(this.props.item.id);
  }

  handleAddToCart({ id, attributes }) {
    const chooseAttributes = attributes.map((a) => {
      const _a = { ...a };
      delete _a.items;
      _a.item = a.items[0];
      return _a;
    })
    
    const cartItem = { id, attributes: chooseAttributes };
    this.props.add(cartItem);
  }

  handleRemoveFromCart(product) {
    this.props.remove(product);
  }

  render() {
    const { product } = this.state;
    // console.log('product :: ', product);
    // console.log('item :: ', this.props.item);
    if (product === null) return <div className='cart-item'/>

    return(
      <div className='cart-item'>
        <div className='lefthand-side'>
          <ScrollView>
            <div className='lefthand-side__content'>
              <p className="">{product.brand}</p>
              <p className="">{product.name}</p>
              <Price prices={product.prices}/>
              <Attributes
                attributes={product.attributes}
                chosenAttributes={this.props.item.attributes}
                selectedAttributes={this.props.item.attributes}
                showOnly
              />
            </div>
          </ScrollView>
        </div>
        <div className='middle'>
          <button onClick={() => this.handleAddToCart(product)}>+</button>
          <span>{this.props.item.count}</span>
          <button onClick={() => this.handleRemoveFromCart(product)}>-</button>
        </div>
        <div className='righthand-side'>
          <img
            src={product.gallery[0]}
            alt={product.name}
          />
        </div>
      </div>
    )
  }
}

export default withCart(CartItem);
