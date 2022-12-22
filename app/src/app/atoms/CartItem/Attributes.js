import React from 'react';
import './Attributes.scss';
import Text from '../Text/Text';
import PropTypes from 'prop-types';

class Item extends React.Component {
  render() {
    const renderTextItem = (item, classList, size, onItemSelect) => {
      let itemNameSize = '';
      switch(size) {
        case 's': itemNameSize = 'xs';  break;
        case 'm': itemNameSize = 's';  break;
        default: itemNameSize = 'xs';
      }

      return (
        <div
          className={classList.join(' ')}
          onClick={() => {
            if(onItemSelect) onItemSelect(item);
          }}
        >
          <Text span size={itemNameSize}>{item.value}</Text>
        </div>
      );
    }
  
    const renderSwatchItem = (item, classList, size, onItemSelect) => {
      switch(size) {
        case 's': classList.push('item--swatch--s');  break;
        case 'm': classList.push('item--swatch--m');  break;
        default: classList.push('item--swatch--s');
      }

      return (
        <div
          className={classList.join(' ')}
          style={type==='swatch' ? {background: item.value} : {}}
          onClick={() => {
            if(onItemSelect) onItemSelect(item);
          }}
        />
      )
    } 

    const { chosen, type, item, size, onItemSelect } = this.props;
    let classList = ['item', `item--${type}`];

    switch(type) {
      case 'text': {
        if (chosen) classList.push('item--text--chosen');
        return renderTextItem(item, classList, size, onItemSelect);
      }
      case 'swatch': {
        if (chosen) classList.push('item--swatch--chosen');        
        return renderSwatchItem(item, classList, size, onItemSelect);
      }
      default: return <div />
    }
  }
}

Item.defaultProps = {
  chosen: false,
  onItemSelect: null,
  size: 's',
}

Item.propTypes = {
  type: PropTypes.string,
  item: PropTypes.shape({
    displayValue: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
  }),
  chosen: PropTypes.oneOfType([
    PropTypes.shape({
      displayValue: PropTypes.string,
      value: PropTypes.string,
      id: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  onItemSelect: PropTypes.func,
  size: PropTypes.oneOf(['s', 'm']), // s = small, m = medium
}

class Attribute extends React.Component {
  constructor() {
    super();
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  handleItemSelect(item) {
    // Prep updated chosenAttribute object
    const _chosenAttribute = { ...this.props.attribute };
    delete _chosenAttribute.items;
    _chosenAttribute.item = item;

    // Update chosenAttributes
    this.props.onSelectionChange(_chosenAttribute);
  }

  render() {
    const { attribute, chosenAttribute, onSelectionChange, size } = this.props;

    let attributeNameSize = ''
    switch(size) {
      case 's': attributeNameSize = 'xs'; break;
      case 'm': attributeNameSize = 'm'; break;
      default: attributeNameSize = 'xs';
    }

    return (
      <div className='attribute'>
        <Text size={attributeNameSize}>{attribute.name}{':'}</Text>
        <div className="attribute__items">
          {attribute.items.map((item) => {
            return (
              <Item
                item={item}
                type={attribute.type}
                chosen={chosenAttribute ? item.id === chosenAttribute.item.id : false}
                onItemSelect={onSelectionChange ? this.handleItemSelect : null}
                size={size}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Attribute.defaultProps = {
  chosenAttribute: null,
  size: 's',
}

Attribute.propTypes = {
  attribute: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        displayValue: PropTypes.string,
        value: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  }).isRequired,
  chosenAttribute: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    item: PropTypes.shape({
      displayValue: PropTypes.string,
      value: PropTypes.string,
      id: PropTypes.string,
    })
  }),
  size: PropTypes.oneOf(['s', 'm']), // s = small, m = medium
}

class Attributes extends React.Component {
  render() {
    const {
      attributes,
      chosenAttributes,
      enableSelectionChange,
      size,
      onSelectionChange
    } = this.props;

    return(
      <div>
        {attributes.map((attribute) => (
          <Attribute
            attribute={attribute}
            chosenAttribute={chosenAttributes ? chosenAttributes.find((ca) => ca.id === attribute.id) : null}
            onSelectionChange={enableSelectionChange ? onSelectionChange : null}
            size={size}
            key={window.crypto.randomUUID()}
          />
        ))}
      </div>
    );
  }
}

Attributes.defaultProps = {
  chosenAttributes: null,
  onAttributeSelect: null,
  size: 's',
  enableSelectionChange: false,
}

Attributes.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          displayValue: PropTypes.string,
          value: PropTypes.string,
          id: PropTypes.string,
        })
      )
    })
  ).isRequired,
  chosenAttributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      item: PropTypes.shape({
        displayValue: PropTypes.string,
        value: PropTypes.string,
        id: PropTypes.string,
      })
    })
  ),
  onSelectionChange: PropTypes.func,
  enableSelectionChange: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm']), // s = small, m = medium
}

export default Attributes;
