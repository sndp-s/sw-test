import React from 'react';
import PropTypes from 'prop-types';
import CurrencyContext from '../../state/contexts/CurrencyContext';
import Text from '../Text/Text';

class Price extends React.Component {
  static contextType = CurrencyContext;

  componentDidMount() {
    if (!this.context.currencies) {
      this.context.loadCurrencies();
    }
  }
  
  render() {
    const { currencies, current, className } = this.context;
    const { prices, size } = this.props;

    if (!currencies || !current || !prices) return <div />;
    
    const price = prices.find((p) => (p.currency.label === current.label));

    if (!price) return <div />;

    return (
      <Text size={size}>
        <Text span size={size}>{price.currency.symbol}</Text>
        <Text span size={size}>{price.amount}</Text>
      </Text>
    );
  }
}

Price.defaultProps = {
  size: 'm',
  className: '',
}

Price.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.shape({
        label: PropTypes.string,
        symbol: PropTypes.string,
      }),
      amount: PropTypes.number,
    })
  ).isRequired,
  size: PropTypes.oneOf(['m', 'l']),
  className: PropTypes.string,
}

export default Price;
