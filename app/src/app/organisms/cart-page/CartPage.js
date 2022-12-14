import React from "react";
import "./CartPage.scss";

import Text from "../../atoms/Text/Text";
import ScrollView from "../../atoms/ScrollView/ScrollView";
import CartItem from "../../atoms/CartItem/CartItem";
import client from "../../client";
import { withCart } from "../../state/providers/CartProvider";
import { withCurrency } from "../../state/providers/CurrencyProvider";
import { getProductQueryFor } from '../../state/queries/products';

class CartPage extends React.Component {
  constructor() {
    super();
    this.fetchProduct = this.fetchProduct.bind(this);
    this.udpateCartItems = this.udpateCartItems.bind(this);
    this.getTotal = this.getTotal.bind(this);
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

  getTotal(items, products, currentCurrencyDetails) {
    if (!currentCurrencyDetails) return '';

    let totalAmount = 0;
    let currencySymbol = '';
  
    // Set current symbol
    currencySymbol = currentCurrencyDetails.symbol;

    // Set current amount
    function getPriceInCurrentCurrency(prices, currentCurrencyDetails) {
      const _priceInCurrentFormat = prices.filter((price) => price.currency.label === currentCurrencyDetails.label);
      return _priceInCurrentFormat[0];
    }
    
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
    
    return `${currencySymbol}${totalAmount}`;
  }

  componentDidMount() {
    this.udpateCartItems(this.props.normalisedCart);
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
    return(
      <div>
        <Text variant='h1' size='xl'>CART</Text>
        <div className="product-list">
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
        </div>
        <div className="total-breakup">
          <table>
            <tbody>
              <tr>
                <td><Text span>Tax 21%</Text></td>
                <td><Text span>$42.00</Text></td>
              </tr>
              <tr>
                <td><Text span>Quantity</Text></td>
                <td><Text span>4</Text></td>
              </tr>
              <tr>
                <td><Text span>Total</Text></td>
                <td><Text span>$432.00</Text></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button><Text>ORDER</Text></button>
      </div>
    );
  }
}

export default withCurrency(withCart(CartPage));
