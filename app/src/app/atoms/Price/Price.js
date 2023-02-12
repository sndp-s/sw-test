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
    const { currencies, current } = this.context;
    const { prices, size, weight, className } = this.props;

    if (!currencies || !current || !prices) return <div />;
    
    const price = prices.find((p) => (p.currency.label === current.label));

    if (!price) return <div />;

    return (
      <Text size={size} weight={weight} className={className}>
        <Text span size={size} weight={weight}>{price.currency.symbol}</Text>
        <Text span size={size} weight={weight}>{price.amount}</Text>
      </Text>
    );
  }
}

Price.defaultProps = {
  size: 'm',
  className: '',
  weight: 400,
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
  weight: PropTypes.oneOf([300, 400, 500, 600, 700])
}

export default Price;
