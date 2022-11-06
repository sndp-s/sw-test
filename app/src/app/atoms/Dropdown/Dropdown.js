import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss'

class Dropdown extends React.Component {
  render() {
    const { children, render, isOpen, onClose, } = this.props;
    return (
      <div className="dd">
        <div className="dd-head">
          {children}
        </div>
        {isOpen ? (
          <div className="dd-content">
            {render}
          </div>       
        ) : null}
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Dropdown;

/**
 * TODO:
 * 1. Add support for a 'renderPosition' (bottom-start, bottom-end) prop.
 * 2. Add modal (use React portals)
 * 3. Add closeOnOutsideClick
*/