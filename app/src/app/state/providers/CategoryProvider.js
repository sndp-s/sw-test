import React from 'react';
import CategoryContext from '../contexts/CategoryContext';

import client from '../../client';
import { getCategoriesQuery } from '../queries/categories';

class CategoryProvider extends React.Component {
  constructor() {
    super();
    // this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.state = {
      categories: [],
      current: null,
    }
  }

  // changeCurrentCategory(category) {
  //   this.setState((_state) => ({ ..._state, current: category }))
  // }

  async componentDidMount() {
    const query = getCategoriesQuery();
    try {
      const response = await client.query({ query });
      this.setState({
        categories: response.data.categories,
        current: response.data.categories[0],
      });
    } catch (error) {
      console.error('ERROR :: failed to fetch \'categories\' ::');
      console.error(error);
    }
  }

  render() {
    const value = { ...this.state };
    return (
      <CategoryContext.Provider value={value}>
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}


export const withCategory = (Child) => (props) => (
  <CategoryContext.Consumer>
    {(context) => <Child {...props} categoryContext={context} />}
  </CategoryContext.Consumer>
)

export default CategoryProvider;