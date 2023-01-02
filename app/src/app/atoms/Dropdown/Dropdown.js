import React, { createRef } from 'react';
import './Dropdown.scss'
import PropTypes from 'prop-types';
import { getEventCoords } from '../../utils';
import Modal from '../Modal/Modal';

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      ddHeadWrapperRef: createRef(),
      ddContentWrapperRef: createRef(),
    };
  }

  componentDidUpdate() {
    // console.log(this.state)
  }

  render() {
    const { children, render, renderPosition, onClose, isOpen } = this.props;
    
    // console.log(this.props)

    const contentStyle = {};
    contentStyle.width = 'fit-content';

    switch (renderPosition) {
      case 'bottom-left': {
        const { ddHeadWrapperRef, ddContentWrapperRef } = this.state;
        console.log('debug', this.props);
        console.log('debug', this.state);
        if ( ddHeadWrapperRef.current
          && ddContentWrapperRef.current
        ) {
          const ddHeadWrapperCoords = ddHeadWrapperRef.current.getBoundingClientRect();
          const ddContentWrapperCoords = ddContentWrapperRef.current.getBoundingClientRect();
          const offset = ddHeadWrapperCoords.x - ddContentWrapperCoords.width;
          console.log('offset', offset);
          contentStyle.transform = `translateX(${offset}px)`;
        }
        break;
      }
      case 'bottom-right': {
        const { ddHeadWrapperRef } = this.state;

        if (ddHeadWrapperRef.current) {
          const coords = ddHeadWrapperRef.current.getBoundingClientRect();

          contentStyle.transform = `translateX(${coords.x}px)`;        
        }
        break;
      }
      default: break;
    }
    
    // const { modalContentXOffset } = this.state;
    // if (renderPosition === 'bottom-left') {
    //   const offset = modalContentXOffset - (this.ddContentWrapperRef.current ? this.ddContentWrapperRef.current.offsetWidth : 0);
    //   contentStyle.transform = `translateX(${offset}px)`;
    // } else {
    //   contentStyle.transform = `translateX(${modalContentXOffset}px)`;
    // }


    return (
      <div className="dd">
        <div
          ref={this.state.ddHeadWrapperRef}
          className="dd-head-wrapper"
          // onClick={this.handleOpenModal}
        >
          {children}
        </div>
        <Modal
          open={isOpen}
          onClose={onClose}
          overlayStyle={{ top: 'var(--navbar-offset)' }}
          disableContentCenter
          // contentStyle={{ transform: `translateX(${modalContentXOffset}px)`, width: 'fit-content' }}
          skipCloseOnElmRef={this.state.ddHeadWrapperRef}
        >
          <div
            className='dd-content-wrapper'
            ref={this.state.ddContentWrapperRef}
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


// import React, { createRef } from 'react';
// import './Dropdown.scss'
// import PropTypes from 'prop-types';
// import { getEventCoords } from '../../utils';
// import Modal from '../Modal/Modal';

// class Dropdown extends React.Component {
//   constructor() {
//     super();
//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.ddContentWrapperRef = createRef();
//     this.state = {
//       modalContentXOffset: 0,
//       ddHeadWrapperRef: null
//     };
//   }
 
//   handleOpenModal(evt) {    
//     // Calc the evt coords
//     const coords = getEventCoords(evt, '.dd');

//     // Extract the skip elm
//     const { target } = evt; // TODO|FIXME: fetch the .dd element specifically, this could be element inside .dd as well.

//     this.setState({ modalContentXOffset: coords.x, ddHeadWrapperRef: target });
//   }

//   render() {
//     const { children, render, renderPosition, onClose, isOpen } = this.props;
    
//     const contentStyle = {};
//     contentStyle.width = 'fit-content';
//     const { modalContentXOffset } = this.state;
//     if (renderPosition === 'bottom-left') {
//       const offset = modalContentXOffset - (this.ddContentWrapperRef.current ? this.ddContentWrapperRef.current.offsetWidth : 0);
//       contentStyle.transform = `translateX(${offset}px)`;
//     } else {
//       contentStyle.transform = `translateX(${modalContentXOffset}px)`;
//     }


//     return (
//       <div className="dd">
//         <div
//           className="dd-head-wrapper"
//           onClick={this.handleOpenModal}
//         >
//           {children}
//         </div>
//         <Modal
//           open={isOpen}
//           onClose={onClose}
//           overlayStyle={{ top: 'var(--navbar-offset)' }}
//           disableContentCenter
//           // contentStyle={{ transform: `translateX(${modalContentXOffset}px)`, width: 'fit-content' }}
//           skipCloseOnElmRef={this.state.ddHeadWrapperRef}
//         >
//           <div
//             class='dd-content-wrapper'
//             ref={this.ddContentWrapperRef}
//             style={contentStyle}
//           >
//             {render}
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

// Dropdown.defaultProps = {
//   renderPosition: 'bottom-right',
// }

// Dropdown.propTypes = {
//   children: PropTypes.node.isRequired,
//   render: PropTypes.node.isRequired,
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   renderPosition: PropTypes.oneOf(['bottom-left', 'bottom-right']),
// }

// export default Dropdown;
