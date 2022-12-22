import React from 'react';
import CategoryContext from '../contexts/CategoryContext';

import client from '../../client';
import { getCategoriesQuery, getCategoryNameQuery } from '../queries/categories';

class CategoryProvider extends React.Component {
  constructor() {
    super();
    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.setCategoriesLoading = this.setCategoriesLoading.bind(this);
    this.loadCategories = this.loadCategories.bind(this);

    this.state = {
      categories: null,
      current: null,
      loading: false, // tracking if categories is being loaded
    }
  }

  async changeCurrentCategory(category) {
    const query = getCategoryNameQuery(category);
    
    try {
      const response = await client.request(query);
    
      this.setState((_state) => ({
        ..._state,
        current: (response.category?.name) ?? null,
      }));
    
    } catch (error) {
      console.log(`failed to set category ${category}`);
    }
  }

  setCategoriesLoading() {
    return new Promise((resolve, reject) => {
      this.setState((_state) => ({ ..._state, loading: true }));

      const intervalId = setInterval(() => {
        if (this.state.loading) {
          clearInterval(intervalId);
          resolve(true);
        }
      }, 500);
    })
  }

  async loadCategories() {
    const query = getCategoriesQuery();
    
    try {
      const response = await client.request(query);
    
      this.setState((_state) => ({
        ..._state,
        categories: (response.categories) ?? null,
        loading: false,
      }));

    } catch (error) {
      console.error('ERROR :: failed to fetch \'categories\' ::');
      console.error(error);
    }
  }

  render() {
    const value = { 
      ...this.state,
      changeCurrentCategory: this.changeCurrentCategory,
      loadCategories: this.loadCategories,
    };

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