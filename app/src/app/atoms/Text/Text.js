import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {
  render() {
    const { children, span, variant } = this.props;

    switch(variant) {

    }
    
    
    return (
      <p>{children}</p>
    );
  }
}

export default Text;

Text.propTypes = {
  chidren: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'p']),
  weight: PropTypes
}