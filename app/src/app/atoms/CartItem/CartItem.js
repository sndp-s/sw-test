import React from 'react';
import './CartItem.scss';
import Text from '../Text/Text';
import Price from '../Price/Price';
import ScrollView from '../ScrollView/ScrollView';
import Attributes from './Attributes';
import { withCart } from '../../state/providers/CartProvider';

class CartItem extends React.Component {
  render() {
    const { item, product, add, remove } = this.props;
    if (!item || !product) return <div className='cart-item'/>
    return(
      <div className='cart-item'>
        <div className='lefthand-side'>
          <ScrollView>
            <div className='lefthand-side__content'>
              <Text size='s'>{product.brand}</Text>
              <Text size='s'>{product.name}</Text>
              <Price prices={product.prices}/>
              <Attributes
                attributes={product.attributes}
                chosenAttributes={item.attributes}
                size="s"
              />
            </div>
          </ScrollView>
        </div>
        <div className='middle'>
          <button onClick={() => add(item)}>+</button>
          <span>{item.count}</span>
          <button onClick={() => remove(item)}>-</button>
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
