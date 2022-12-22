import React from 'react';
import PropTypes from 'prop-types';
import './ScrollView.scss';

class ScrollView extends React.Component {

  render() {
    const { variant, hideScroll } = this.props;

    const scrollVariantClass = 'scrollview--' + variant;
    const scrollInvisibleClass = hideScroll ? 'scrollview--hide-scroll' : '';
    return (
      <div
        className={["scrollview",
          scrollVariantClass,
          scrollInvisibleClass,
        ].join(' ')}
      >
        {this.props.children}
      </div>
    );
  }
}


ScrollView.defaultProps = {
  variant: 'v',
  hideScroll: false,
}

ScrollView.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h', 'v']), 
}



export default ScrollView;