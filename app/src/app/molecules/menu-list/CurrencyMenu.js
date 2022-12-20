import React from 'react';
import './CurrencyMenu.scss';

import Text from '../../atoms/Text/Text';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import CurrencyContext from '../../state/contexts/CurrencyContext'; 
import DownArrow from '../../../assets/down-arrow.svg';

class CurrencyMenu extends React.Component {

  static contextType = CurrencyContext;
  
  constructor() {
    super();
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this);
    this.state = { isOpen: false }
  }

  componentDidMount() {
    if (!this.context.currencies) {
      this.context.loadCurrencies();
    }
  }

  closeMenu(e) {
    this.setState({ isOpen: false});
  }

  toggleMenu(e) {
    this.setState((_state) => ({ isOpen: !_state.isOpen })) 
  }

  handleCurrencySelect(currency) {
    this.context.changeCurrentCurrency(currency);
    this.closeMenu();
  }
  
  render() {
    const { currencies, current } = this.context;

    if (!currencies) return <div/>;

    return (
      <Dropdown
        isOpen={this.state.isOpen}
        onClose={this.closeMenu}
        render={(
          <ul className='dd-menu'>
            {currencies.map((c) => (
              <li 
                className='dd-menu__item'
                key={c.label}
                onClick={(evt) => {
                  evt.stopPropagation();
                  this.handleCurrencySelect(c);
                }}
              >
                <Text size='m'>{c.symbol}{' '}{c.label}</Text>
              </li>
            ))}
          </ul>
        )}
      >
        <button
          className='dd-head'
          onClick={this.toggleMenu}
        >
          <Text span size='m'>{current ? current.symbol : ''}</Text>
          <img
            src={DownArrow}
            alt='down arrow'
            style={this.state.isOpen ? { transform: 'rotate(180deg)' } : {}}
          />
        </button>
      </Dropdown>
    );
  }
}

export default CurrencyMenu;
