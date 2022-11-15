import React from 'react';
import './CurrencyMenu.scss';

import Dropdown from '../../atoms/Dropdown/Dropdown';
import CurrencyContext from '../../state/contexts/CurrencyContext'; 

class CurrencyMenu extends React.Component {

  static contextType = CurrencyContext;
  
  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
    this.handleOnToggle = this.handleOnToggle.bind(this);
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    if (!this.context.currencies) {
      this.context.loadCurrencies();
    }
  }

  onClose(e) {
    this.setState({
      isOpen: false
    })
  }

  handleOnToggle(e) {
    this.setState({
      isOpen: !this.state.isOpen,
    }) 
  }

  handleOnClick(e, c) {
    const { label, symbol } = c;
    this.context.changeCurrentCurrency({ label, symbol });
  }
  
  render() {
    const { currencies, current } = this.context;

    if (!currencies) return <div/>;

    return (
      <Dropdown
        isOpen={this.state.isOpen}
        onClose={this.onClose}
        render={(
          <ul className='dd-menu'>
            {currencies.map((c) => (
              <li 
                className='dd-menu__item'
                key={c.label}
                onClick={(e) => this.handleOnClick(e, c)}
              >
                <span>{c.symbol}</span>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        )}
      >
        <button
          className='dd-head'
          onClick={this.handleOnToggle}
        >
          <span>
            {current ? current?.symbol : ''}
          </span>
        </button>
      </Dropdown>
    );
  }
}

export default CurrencyMenu;

/**
 * fix style
 * fix positioning
 * add onClickOutside => Close();
*/