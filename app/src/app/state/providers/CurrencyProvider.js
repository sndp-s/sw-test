import React from 'react';
import CurrencyContext from '../contexts/CurrencyContext'; 
import client from '../../client';
import { getCurrenciesQuery } from '../queries/currencies';

class CurrencyProvider extends React.Component {
  constructor() {
    super();
    this.changeCurrentCurrency = this.changeCurrentCurrency.bind(this);
    this.state = {
      currencies: [],
      current: null,
    }
  }

  changeCurrentCurrency(currency) {
    this.setState((_state) => ({ ..._state, current: currency }))
  }

  async componentDidMount() {
    const query = getCurrenciesQuery();
    try {
      const response = await client.query({ query });
      this.setState({
        currencies: response.data.currencies,
        current: response.data.currencies[0],
      });
    } catch (error) {
      console.error('ERROR :: failed to fetch \'currencies\' ::');
      console.error(error);
    }
  }

  render() {
    const value = {...this.state, changeCurrentCurrency: this.changeCurrentCurrency};
    return (
      <CurrencyContext.Provider value={value}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}


export const withCurrency = (Child) => (props) => (
  <CurrencyContext.Consumer>
    {(context) => <Child {...props} currencyContext={context} />}
  </CurrencyContext.Consumer>
)

export default CurrencyProvider;