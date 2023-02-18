import React from "react";
import "./CartPage.scss";

import Text from "../../atoms/Text/Text";
import ScrollView from "../../atoms/ScrollView/ScrollView";
import CartItem from "../../atoms/CartItem/CartItem";
import client from "../../client";
import { withCart } from "../../state/providers/CartProvider";
import { withCurrency } from "../../state/providers/CurrencyProvider";
import { getProductQueryFor } from '../../state/queries/products';
import { TAX_PERCENT } from '../../../constants';

class CartPage extends React.Component {
  constructor() {
    super();
    this.fetchProduct = this.fetchProduct.bind(this);
    this.udpateCartItems = this.udpateCartItems.bind(this);
    this.getSumTotal = this.getSumTotal.bind(this);
    this.state = { products: {} };
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
    this.udpateCartItems(this.props.normalisedCart);
  }

  componentDidUpdate(prevProps, prevState) {
    const { cart, normalisedCart } = this.props;
    const { cart: prevCart } = prevProps;

    if (cart.length !== prevCart.length) {
      this.udpateCartItems(normalisedCart);
    }

    const { products } = this.state;
    const { products: prevProducts } = prevState;

    if (products !== prevProducts) {
      console.log('state.products changed');
    }
  }

  render() {
    const { cart, normalisedCart, currencyContext } = this.props;
    const { products } = this.state;

    const sumTotal = this.getSumTotal(normalisedCart, products, currencyContext.current);
    const taxAmount = this.getTaxAmount(sumTotal, TAX_PERCENT);
    const finalAmount = sumTotal + taxAmount;

    return(
      <div className="cart-page">
        <Text variant='h1' size='xl' className="cart-page__title">CART</Text>
        <div className="cart-page__product-list">
          <ScrollView hideScroll>
            { (normalisedCart.length > 0) ?
              normalisedCart.map((item, index) => {
                const product = this.state.products[item.id];
                if (!product) return null;
                return(
                  <CartItem
                    item={item}
                    product={product}
                    key={index}
                    size="l"
                  />
                );
              }) : <Text>Cart is empty</Text>
            }
          </ScrollView>
        </div>
        {(normalisedCart.length > 0) && (
          <>
            <div className="cart-page__total-breakup">
              <table>
                <tbody>
                  <tr>
                    <td><Text span size="l">Tax {TAX_PERCENT}%:&nbsp;</Text></td>
                    <td><Text span size="l" weight={700}>{currencyContext.current?.symbol}{taxAmount}</Text></td>
                  </tr>
                  <tr>
                    <td><Text span size="l">Quantity:&nbsp;</Text></td>
                    <td><Text span size="l" weight={700}>{cart.length}</Text></td>
                  </tr>
                  <tr>
                    <td><Text span size="l">Total:&nbsp;</Text></td>
                    <td>
                      <Text span size="l" weight={700}>
                        {currencyContext.current?.symbol}{finalAmount}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="cart-page__add-to-cart">
              <Text className="cart-page__add-to-cart__text">ORDER</Text>
            </button>
          </>
        )}
      </div>
    );
  }
}

export default withCurrency(withCart(CartPage));
