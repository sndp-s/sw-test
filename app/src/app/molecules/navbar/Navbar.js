import React from 'react';
import './Navbar.scss';

import { withRouter } from 'react-router-dom';
import CategoryContext from '../../state/contexts/CategoryContext';

class Navbar extends React.Component {
  static contextType = CategoryContext;
  
  constructor() {
    super();
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  handleCategoryClick(e, categoryName) {
    this.props.history.push('/category/' + categoryName);
  }

  componentDidMount() {
    const { categories, loadCategories } = this.context;
    if (!categories) loadCategories();
  }

  render() {
    const { categories } = this.context;

    if (categories === null) return <div/>;

    return (
      <ul className='list' >
        {categories.map((c) => (
          <li
            key={c.name}
            className='list-item'
          >
            <button
              onClick={(e) => this.handleCategoryClick(e, c.name)}
              className='list-item__content'
            >
              <span className='list-item__content__text'>{c.name}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(Navbar);