import React from 'react';

import './App.scss';

import Header from './app/organisms/header/Header';
import ProductListingPage from './app/organisms/product-listing-page/ProductListingPage';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='page--container'>
          <main className='main'>
            <ProductListingPage />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
