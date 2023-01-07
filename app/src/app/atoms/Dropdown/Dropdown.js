import React, { createRef } from 'react';
import './Dropdown.scss'
import PropTypes from 'prop-types';
import { getEventCoords } from '../../utils';
import Modal from '../Modal/Modal';

class Dropdown extends React.Component {
  state = { ddHeadWrapperRef: createRef() };

  render() {
    const { children, render, renderPosition, onClose, isOpen } = this.props;
    const { ddHeadWrapperRef } = this.state;

    const contentStyle = {};
    switch (renderPosition) {
      case 'bottom-left': {
        if (ddHeadWrapperRef.current) {
          const coords = ddHeadWrapperRef.current.getBoundingClientRect();
          contentStyle.transform = `translateX(calc(${coords.x}px - 100% + ${coords.width}px))`;
        }
        break;
      }
      case 'bottom-right': {
        if (ddHeadWrapperRef.current) {
          const coords = ddHeadWrapperRef.current.getBoundingClientRect();
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
          ref={this.state.ddHeadWrapperRef}
        >
          {children}
        </div>
        <Modal
          open={isOpen}
          onClose={onClose}
          overlayStyle={{ top: 'var(--navbar-offset)' }}
          disableContentCenter
          skipCloseOnElmRef={this.state.ddHeadWrapperRef}
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
