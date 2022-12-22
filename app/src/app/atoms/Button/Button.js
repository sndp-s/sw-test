import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { children, onClick, type, className, variant, color } = this.props;

    let variantClass = '';
    switch (variant) {
      case 's': variantClass = 'btn--s'; break;
      case 'l': variantClass = 'btn--l'; break;
      default: variantClass = 'btn--s';
    }

    let colorClass = '';
    switch (color) {
      case 'white': colorClass += 'btn--color-white'; break;
      case 'green': colorClass += 'btn--color-green'; break;
      default: colorClass += 'btn-white';
    }

    return (
      <button
        onClick={onClick}
        type={type}
        className={['btn' + colorClass + variantClass + className].join(' ')}
      >
        {children}
      </button>
    );
  }
}

Button.defaultProps = {
  onClick: null,
  type: 'button',
  className: '',
  variant: 'm',
  color: 'white',
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['m', 'l']), // s = small, l = large
  color: PropTypes.oneOf(['green', 'white'])
}


export default Button;
