import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';

import Header from './app/organisms/header/Header';
import ProductListingPage from './app/organisms/product-listing-page/ProductListingPage';
import ProductDisplayPage from './app/organisms/product-display-page/ProductDisplayPage';
import CartPage from './app/organisms/cart-page/CartPage';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Header/>
            <div className='page--container'>
              <Switch>
                <Route path='/' exact>
                  <ProductListingPage/>
                </Route>
                <Route path='/category/:categoryName' exact>
                  <ProductListingPage/>
                </Route>
                <Route path='/product/:productId' exact>
                  <ProductDisplayPage/>
                </Route>
                <Route path='/cart' exact>
                  <CartPage/>
                </Route>
              </Switch>
            </div>
        </Router>
      </div>  
    );
  }
}

export default App;
