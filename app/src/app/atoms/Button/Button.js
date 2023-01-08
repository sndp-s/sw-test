import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = React.forwardRef(
  ({ children, onClick, type, className }, forwadedRef) => {
  class Button extends React.Component {
    render() {
      const classes = ['btn', className];
      return (
        <button
          type={type}
          ref={forwadedRef}
          onClick={onClick}
          className={classes.join(' ')}
        >
          {children}
        </button>
      );
    }
  }
  return <Button />;
});
Button.defaultProps = {
  type: 'button',
  className: null,
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
}

export default Button;
