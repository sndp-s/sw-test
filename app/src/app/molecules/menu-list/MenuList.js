import React from 'react';

import './MenuList.scss';

import CurrencyMenu from './CurrencyMenu';
import CartMenu from './CartMenu';

class MenuList extends React.Component {
  render(){
    return (
      <div className='list'>
        <CurrencyMenu />
        {/* <CartMenu /> */}
      </div>
    );
  }
}

export default MenuList;