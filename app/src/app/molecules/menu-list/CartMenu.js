import React from "react";
import './CartMenu.scss';
import ScrollView from '../../atoms/ScrollView/ScrollView';
import CartItem from '../../atoms/CartItem/CartItem';
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
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
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = products[item.id];
      if (!product) {
        totalAmount = 0;
        break;
      }
      const priceInCurrentFormat = getPriceInCurrentCurrency(product.prices, currentCurrencyDetails);
      if (priceInCurrentFormat) totalAmount += (priceInCurrentFormat.amount * item.count);
    }
    
    return parseFloat(totalAmount.toFixed(2));
  }

  getTaxAmount(total, taxPercent) {
    const taxAmount = ( taxPercent * total ) / 100;
    return parseFloat(taxAmount.toFixed(2));
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
    const { cart, normalisedCart, currencyContext, onClose } = this.props;
    const { products } = this.state;

    const sumTotal = this.getSumTotal(normalisedCart, products, currencyContext.current);
    const taxAmount = this.getTaxAmount(sumTotal, TAX_PERCENT);
    const finalAmount = parseFloat((sumTotal + taxAmount).toFixed(2));

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
          <Text weight={700}>Total</Text>
          <Text weight={700}>{currencyContext.current?.symbol}{finalAmount}</Text>
        </div>
        <div className='buttons'>
          <Button
            onClick={() => {
              this.props.history.push('/cart');
              onClose();
            }}
            className="button --bg-white --color-black --border-black"
          >
            <Text
              weight={600}
              size='xs'
            >
              VIEW BAG
            </Text>
          </Button>
          <Button
            onClick={() => console.log('Checking out...')}
            className="button --bg-green --color-white"
          >
            <Text
              size='xs'
              weight={600}
            >
              CHECK OUT
            </Text>
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(withCart(withCurrency(Menu)));