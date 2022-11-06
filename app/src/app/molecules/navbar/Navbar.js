import React from 'react';
import "./Navbar.scss";

import CategoryContext from '../../state/contexts/CategoryContext';

class Navbar extends React.Component {
  static contextType = CategoryContext;
  constructor() {
    super();
    
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  handleCategoryClick(e, categoryName) {
    console.log(categoryName)
  }

  render() {
    const { categories } = this.context;

    return (
      <ul className="list" >
        {categories.map((c) => (
          <li
            key={c.name}
            className="list-item"
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

export default Navbar;