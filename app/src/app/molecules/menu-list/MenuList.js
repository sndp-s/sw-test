import React from 'react';

import './MenuList.scss';

import CurrencyMenu from './CurrencyMenu';
import CartDropdown from './CartDropdown';

class MenuList extends React.Component {
  render(){
    return (
      <div className='list'>
        <CurrencyMenu />
        <CartDropdown />
      </div>
    );
  }
}

export default MenuList;