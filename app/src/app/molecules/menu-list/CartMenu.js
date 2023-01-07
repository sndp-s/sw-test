import React from "react";
import './CartMenu.scss';
import ScrollView from '../../atoms/ScrollView/ScrollView';
import CartItem from '../../atoms/CartItem/CartItem';
import Text from "../../atoms/Text/Text";
import client from "../../client";
import { withRouter } from "react-router-dom";
import { withCart } from "../../state/providers/CartProvider";
import { withCurrency } from "../../state/providers/CurrencyProvider";
import { getProductQueryFor } from '../../state/queries/products';
import { TAX_PERCENT } from '../../../constants';

class Menu extends React.Component {
  constructor() {
    super();
    this.fetchProduct = this.fetchProduct.bind(this);
    this.udpateCartItems = this.udpateCartItems.bind(this);
    this.getSumTotal = this.getSumTotal.bind(this);
    this.state = {
      products: {},
    }
  }

  async fetchProduct(productId) {
    const query = getProductQueryFor(productId);
    try {
      const response = await client.request(query);
      return response.product;
    } catch (error) {
      console.error(`ERROR :: failed to fetch 'product' ${productId}`);
      console.error(error);
    }
  }
  
  async udpateCartItems(items) {
    items.forEach(async (item) => {
      if (!this.state.products[item.id]) {
        const product = await this.fetchProduct(item.id);
        this.setState((_state) => ({
          products: {..._state.products, [product.id]: product },
        }));
      }
    })
  }

  getSumTotal(items, products, currentCurrencyDetails) {
    let totalAmount = 0;

    if (!currentCurrencyDetails) return totalAmount;

    function getPriceInCurrentCurrency(prices, currentCurrencyDetails) {
      const _priceInCurrentFormat = prices.filter((price) => price.currency.label === currentCurrencyDetails.label);
      return _priceInCurrentFormat[0];
    }

    // Calculate the sum
    for(let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = products[item.id];
      if (!product) {
        totalAmount = '';
        break;
      }
      const priceInCurrentFormat = getPriceInCurrentCurrency(product.prices, currentCurrencyDetails);
      if (priceInCurrentFormat) totalAmount += (priceInCurrentFormat.amount * item.count);
      totalAmount = Math.round(totalAmount * 100)/100;
    }
    
    return totalAmount;
  }

  getTaxAmount(total, taxPercent) {
    const taxAmount = ( taxPercent * total ) / 100;
    return Math.round(taxAmount * 100)/100;
  }

  componentDidMount() {
    const { normalisedCart } = this.props;
    this.udpateCartItems(normalisedCart);
  }

  componentDidUpdate(prevProps) {
    const { cart, normalisedCart } = this.props;
    const { cart: prevCart } = prevProps;

    if(cart.length !== prevCart.length) {
      this.udpateCartItems(normalisedCart);
    }
  }

  render() {
    const { cart, normalisedCart, currencyContext } = this.props;
    const { products } = this.state;

    const sumTotal = this.getSumTotal(normalisedCart, products, currencyContext.current);
    const taxAmount = this.getTaxAmount(sumTotal, TAX_PERCENT);
    const finalAmount = sumTotal + taxAmount;

    return(
      <div className="menu">
        <div className="heading">
          <Text weight={500}><Text span weight={700}>My Bag,</Text> {cart.length ?? 0} items</Text>
        </div>
        <div className="product-list">
          {(normalisedCart.length > 0) ? (
            <ScrollView hideScroll>
              {
                normalisedCart.map((item, index) => {
                  const product = this.state.products[item.id];
                  if (!product) return null;
                  return(
                    <CartItem
                      item={item}
                      product={product}
                      key={index}
                    />
                  );
                })
              }
            </ScrollView>
          ) : null}
        </div>
        <div className="total">
          <span>Total</span>
          <span>{currencyContext.current?.symbol}{finalAmount}</span>
        </div>
        <div className='buttons'>
          <button onClick={() => {this.props.history.push('/cart')}}>VIEW BAG</button>
          <button onClick={() => console.log('Checking out...')}>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default withRouter(withCart(withCurrency(Menu)));