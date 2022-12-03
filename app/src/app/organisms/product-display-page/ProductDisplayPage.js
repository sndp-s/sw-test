import React from 'react';
import './ProductDisplayPage.scss';
import { withRouter } from 'react-router-dom';
import { getProductQueryFor } from '../../state/queries/products';
import client from '../../client';
import ScrollView from '../../atoms/ScrollView/ScrollView';

class ProductDisplayPage extends React.Component {
  constructor() {
    super();
    this.fetchProduct = this.fetchProduct.bind(this);
    this.state={
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
    const { productId } = this.props.match?.params;

    if (productId) {
      this.fetchProduct(productId);
    }

    // console.log('PDP :: mount :: ', this.state);
  }

  // componentDidUpdate() {
  //   console.log('PDP :: update :: ', this.state);
  // }

  render() {
    if (!this.state.product) return <div/>;

    return(
      <div className="pdp">
        <div className="lefthandside">
          <div className="gallery">
            <ScrollView>
              <ul className="img-list">
                  <li>
                    {/* <img/> */}
                  </li>
              </ul>
            </ScrollView> 
            <div className='main-view'>

            </div>
          </div>
        </div>
        <div className="righthandside">

        </div>
      </div>
    );
  }
}

export default withRouter(ProductDisplayPage);