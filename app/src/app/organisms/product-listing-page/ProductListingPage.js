import React from 'react';
import ProductGrid from '../../molecules/product-listing/ProductGrid';
import { withRouter } from 'react-router-dom';
import { withCurrency } from '../../state/providers/CurrencyProvider';
import { withCategory } from '../../state/providers/CategoryProvider';
import Text from '../../atoms/Text/Text';

class ProductListingPage extends React.Component {

  constructor() {
    super();
    this.checkPathAndUpdateCategory = this.checkPathAndUpdateCategory.bind(this);
  }

  checkPathAndUpdateCategory = async (location) => {
    // When at root
    if (location.pathname === '/') {
      if (this.props.categoryContext.categories) {
        const first = this.props.categoryContext.categories[0];
        this.props.categoryContext.changeCurrentCategory(first.name);
      }
      return;
    }

    // When at other paths (!root)
    const resources = location.pathname.split('/')
    if (resources[0] === '') resources.shift();
    const queriedCategory = resources[1];
    this.props.categoryContext.changeCurrentCategory(queriedCategory);
  }

  componentDidMount() {
    // Update current category on mount
    this.checkPathAndUpdateCategory(this.props.location);
    
    // Update current category on URL change
    const locationChangeHandler = (location, action) => {
      this.checkPathAndUpdateCategory(location);
    }
    this.unlisten = this.props.history.listen(locationChangeHandler);
  }

  componentWillUnmount() {
    // Remove the URL change listener
    this.unlisten();
  }

  componentDidUpdate(prevProps) {
    const { categoryContext, location } = this.props;
    const { categoryContext: prevCategoryContext } = prevProps;
    
    // Update current category on categories change
    if (categoryContext.categories !== prevCategoryContext.categories) {
      this.checkPathAndUpdateCategory(location);
    }
  }

  render() {
    if (this.props.categoryContext.current === null) return <Text>Nothing to show...</Text>

    return (
      <div>
          <Text variant='h1' size='xl'>{this.props.categoryContext.current}</Text>
          <ProductGrid category={this.props.categoryContext.current}/>
      </div>
    )
  }
}

const withData = (x) => (withCategory(withCurrency(x)));
export default withRouter(withData(ProductListingPage));

