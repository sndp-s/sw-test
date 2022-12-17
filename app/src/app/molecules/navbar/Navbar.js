import React from 'react';
import './Navbar.scss';
import Text from '../../atoms/Text/Text';
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
      <ul className='category-list' >
        {categories.map((c) => (
          <li
            key={c.name}
            className='category-item'
          >
            <button
              onClick={(e) => this.handleCategoryClick(e, c.name)}
              className='category-button'
            >
              <Text span size='s' className='category-name'>{c.name.toUpperCase()}</Text>
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(Navbar);