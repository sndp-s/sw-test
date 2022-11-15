import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';

import Header from './app/organisms/header/Header';
import ProductListingPage from './app/organisms/product-listing-page/ProductListingPage';

class App extends React.Component {
  render() {
    // return (
    //   <div className='App'>
    //     <Header />
    //     <div className='page--container'>
    //       <main className='main'>
    //         <ProductListingPage />
    //       </main>
    //     </div>
    //   </div>
    // );
    return (
      <div className='App'>
        <Router>
          <Header />
            <div className='page--container'>
              <Switch>
                <Route path='/' exact>
                  {<ProductListingPage />}
                </Route>
                <Route path='/category/:categoryName' exact>
                  {<ProductListingPage />}
                </Route>
                <Route path='/catgory/product' exact>
                  {<div>/category/product</div>}
                </Route>
              </Switch>
            </div>
        </Router>
      </div>  
    );
  }
}

export default App;
