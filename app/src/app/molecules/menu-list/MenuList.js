import React from 'react';

import './MenuList.scss';

import CurrencyDropdown from './CurrencyDropdown';
import CartDropdown from './CartDropdown';

class MenuList extends React.Component {
  render(){
    return (
      <div className='list'>
        <CurrencyDropdown />
        <CartDropdown />
      </div>
    );
  }
}

export default MenuList;