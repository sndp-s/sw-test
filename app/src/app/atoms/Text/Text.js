import React from 'react';
import './Text.scss';
import PropTypes from 'prop-types';

class Text extends React.Component {
  render() {
    let { children, span, variant, className, size } = this.props;

    className += ['txt', `txt-${size}`].join(' ');

    if(span) {
      return (
        <span className={className}>
          {children}
        </span>
      )
    }

    switch(variant) {
      case 'h1': return <h1 className={className}>{children}</h1>
      case 'h2': return <h2 className={className}>{children}</h2>
      case 'h3': return <h3 className={className}>{children}</h3>
      case 'p': return <p className={className}>{children}</p>
      default: return <p className={className}>{children}</p>
    }   
  }
}


Text.defaultProps = {
  className: '',
  variant: 'p',
  size: 's',
}

Text.propTypes = {
  chidren: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'p']),
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
}

export default Text;
