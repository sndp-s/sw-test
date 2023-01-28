import React, { createRef } from 'react';
import './Dropdown.scss'
import PropTypes from 'prop-types';
import { getEventCoords } from '../../utils';
import Modal from '../Modal/Modal';

class Dropdown extends React.Component {
  ddHeadWrapperRef = createRef();
  // ddContentWrapperRef = createRef();

  render() {
    const { children, render, renderPosition, onClose, isOpen } = this.props;
    const contentStyle = {};
    switch (renderPosition) {
      case 'bottom-left': {
        if (this.ddHeadWrapperRef.current) {
          const coords = this.ddHeadWrapperRef.current.getBoundingClientRect();
          contentStyle.transform = `translateX(calc(${coords.x}px - 100% + ${coords.width}px))`;
        }
        break;
      }
      case 'bottom-right': {
        if (this.ddHeadWrapperRef.current) {
          const coords = this.ddHeadWrapperRef.current.getBoundingClientRect();
          contentStyle.transform = `translateX(${coords.x}px)`;        
        }
        break;
      }
      default: break;
    }

    return (
      <div className="dd">
        <div
          className="dd__head--wrapper"
          ref={this.ddHeadWrapperRef}
        >
          {children}
        </div>
        <Modal
          open={isOpen}
          onClose={onClose}
          disableContentCenter
          // ref={this.ddContentWrapperRef}
          overlayStyle={{ top: 'var(--navbar-offset)' }}
          skipCloseOnElmRef={this.ddHeadWrapperRef}
        >
          <div
            className='dd__content--wrapper'
            style={contentStyle}
          >
            {render}
          </div>
        </Modal>
      </div>
    );
  }
}
Dropdown.defaultProps = {
  renderPosition: 'bottom-right',
}
Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  render: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  renderPosition: PropTypes.oneOf(['bottom-left', 'bottom-right']),
}

export default Dropdown;
