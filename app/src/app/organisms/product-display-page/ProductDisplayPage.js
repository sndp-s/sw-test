import React from 'react';
import './ProductDisplayPage.scss';
import Text from '../../atoms/Text/Text';
import Price from '../../atoms/Price/Price';
import ScrollView from '../../atoms/ScrollView/ScrollView';
import { withCart } from '../../state/providers/CartProvider';
import { withRouter } from 'react-router-dom';
import client from '../../client';
import { getProductQueryFor } from '../../state/queries/products';
import Attributes from '../../atoms/CartItem/Attributes';
import parse from 'html-react-parser';

class ProductDisplayPage extends React.Component {
  constructor() {
    super();
    this.fetchProduct = this.fetchProduct.bind(this);
    this.handleOnSelectionChange = this.handleOnSelectionChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.state = {
      product: null,
      mainViewImgIndex: 0,
      chosenAttributes: null,
    }
  }

  async fetchProduct(productId) {
    const query = getProductQueryFor(productId);
    try {
      const response = await client.request(query);
      this.setState((_state) => ({
        ..._state,
        product: (response.product) ?? null,
      }));
    } catch (error) {
      console.error(`ERROR :: failed to fetch 'product' ${productId}`);
      console.error(error);
    }
  }

  handleImgClick(index) {
    this.setState((_state) => ({
      ..._state,
      mainViewImgIndex: index,
    }));
  }

  handleOnSelectionChange(updatedAttribute) {
    let updatedAttributes = this.state.chosenAttributes
      ? [...this.state.chosenAttributes] : [];
    
    const updateIndex = updatedAttributes.findIndex((a) => a.id === updatedAttribute.id);

    if(updateIndex > -1) {
      updatedAttributes[updateIndex] = updatedAttribute;
    } else {
      updatedAttributes.push(updatedAttribute);
    }
    
    this.setState({
      chosenAttributes: updatedAttributes,      
    });
  }

  handleAddToCart() {
    const { attributes } = this.state.product;
    const { chosenAttributes } = this.state;
    
    if(attributes.length !== 0) {
      // Check if all the attributes are selected
      if (!chosenAttributes) {
        alert('Please select all the attributes before adding the product to cart.');
        return;
      }
      const attributeIdList = attributes.map((a) => a.id);
      for(let toCheckAttributeId of attributeIdList) {
        const chosenAttribute = chosenAttributes.find((ca) => ca.id === toCheckAttributeId);
        if (!chosenAttribute) {
          alert('Please select all the attributes before adding the product to cart.');
          return;
        }
      }
    }

    const cartItem = { id: this.state.product.id, attributes: this.state.chosenAttributes };
    
    this.props.add(cartItem);
  }

  componentDidMount() {
    const { productId } = this.props.match?.params;
    if (productId) {
      this.fetchProduct(productId);
    }
  }

  render() {
    const { product } = this.state;
    if (!product) return <div/>;
    return(
      <div className="pdp">
        <div className="lefthandside">
          <div className="lefthandside__gallery">
            <div className="lefthandside__gallery__img-list--wrap">
              <ScrollView hideScroll>
                <ul className="lefthandside__gallery__img-list">
                  {product.gallery.map((url, index) => (
                    <li key={index} onClick={(ev) => { this.handleImgClick(index) }}>
                      <img src={url} alt={product.name}/>
                    </li>
                  ))}
                </ul>
              </ScrollView> 
            </div>
            <div className='lefthandside__gallery__main-view'>
              <div className='lefthandside__gallery__main-view__img-wrap'>
                <img src={product.gallery[this.state.mainViewImgIndex ?? 0]} alt={product.name}/>
              </div>
            </div>
          </div>
        </div>
        <div className="righthandside">
          <Text size='l'>{product.brand}</Text>
          <Text size='l'>{product.name}</Text>
          <Attributes
            attributes={product.attributes}
            chosenAttributes={this.state.chosenAttributes}
            onSelectionChange={this.handleOnSelectionChange}
            enableSelectionChange
            size="m"
          />
          <Price prices={product.prices} size='l'/>
          {product.inStock ? (
            <button
              className='righthandside__add-to-cart'
              onClick={this.handleAddToCart}
            >
              <p className='righthandside__add-to-cart__text'>ADD TO CART</p>
            </button>
          ) : <p>OUT OF STOCK!</p>}
          <div>
            {parse(product.description)}
          </div>
        </div>
      </div>
    );
  }
}

export default withCart(withRouter(ProductDisplayPage));
