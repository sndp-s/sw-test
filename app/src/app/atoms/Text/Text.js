import React from 'react';
import './Text.scss';
import PropTypes from 'prop-types';

class Text extends React.Component {
  render() {
    let { children, span, variant, className, size, weight } = this.props;

    const classes = ['txt', `txt--size-${size}`, `txt--weight-${weight}`, className].join(' ');

    if(span) {
      return (
        <span className={classes}>
          {children}
        </span>
      )
    }

    switch(variant) {
      case 'h1': return <h1 className={classes}>{children}</h1>
      case 'h2': return <h2 className={classes}>{children}</h2>
      case 'h3': return <h3 className={classes}>{children}</h3>
      case 'p': return <p className={classes}>{children}</p>
      default: return <p className={classes}>{children}</p>
    }   
  }
}


Text.defaultProps = {
  className: '',
  variant: 'p',
  size: 's',
  weight: 400,
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'p']),
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  weight: PropTypes.oneOf([300, 400, 500, 600, 700])
}

export default Text;
