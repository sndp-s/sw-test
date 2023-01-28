import React, { createRef } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import { getEventCoords } from '../../utils';

class Modal extends React.Component {
  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.modalRef = createRef();
    this.contentRef = createRef();
  }

  handleOutsideClick(evt) {
    if (
      this.modalRef.current
      && !this.modalRef.current.contains(evt.target)
    ) {
      
      const { skipCloseOnElmRef } = this.props;
      if ((skipCloseOnElmRef.current
        && skipCloseOnElmRef.current.contains(evt.target))
        || (
          this.contentRef.current
          && this.contentRef.current.contains(evt.target)
        )
      ) return;

      this.props.onClose();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  render() {
    const { children, open, onClose, overlayStyle, contentStyle, disableContentCenter } = this.props;
    
    if (!open) return null;

    const overlayClasses = ['modal-overlay'];
    if (!disableContentCenter) overlayClasses.push('modal-overlay--content-center');

    return (
      <div
        ref={this.modalRef}
        onClick={() => { console.log('DEBUG'); onClose(); }}
        className={overlayClasses.join(' ')}
        style={overlayStyle}
      >
        {children ? (
          <div
            className="modal-content"
            style={contentStyle}
            ref={this.contentRef}
            onClick={(evt) =>{ evt.stopPropagation(); }}
          >
            {children}
          </div>
        ) : null}
      </div>
    );
  }
}

Modal.defaultProps = {
  children: null,
  overlayStyle: {},
  skipCloseOnElmRef: null,
}

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  overlayStyle: PropTypes.shape({}),
  skipCloseOnElmRef: PropTypes.shape({}),
};

export default Modal;
