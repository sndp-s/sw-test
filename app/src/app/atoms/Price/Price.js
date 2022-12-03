import React from 'react';
import CurrencyContext from '../../state/contexts/CurrencyContext';


class Price extends React.Component {
  static contextType = CurrencyContext;

  componentDidMount() {
    if (!this.context.currencies) {
      this.context.loadCurrencies();
    }
  }
  
  render() {
    const { currencies, current } = this.context;
    const { prices } = this.props;

    if (!currencies || !current || !prices) return <div />;
    
    const price = prices.find((p) => (p.currency.label === current.label));

    if (!price) return <div />;

    return (
      <div className='price'>
        <span>{price.currency.symbol}</span>
        <span>{price.amount}</span>
      </div>
    );
  }
}

export default Price;
