import React from 'react';
import './Attributes.scss';

/**
 * @param {function} onItemSelect - Inform item.id to the Attribute chosen
*/
class Item extends React.Component {
  render() {
    const renderTextItem = (item, className) => (
      <div className={className}>
        {item.value}
      </div>
    );
  
    const renderSwatchItem = (item, className) => (
      <div
        className={className}
        style={type==='swatch' ? {background: item.value} : {}}
      >
        {item.value}
      </div>
    );

    const { chosen, type, item } = this.props;
    let classList = ['item'];

    switch(type) {
      case 'text': {
        if (chosen) {
          classList.push('item--chosen-text');
        }
        return renderTextItem(item, classList.join(' '));
      }
      case 'swatch': {
        if (chosen) {
          classList.push('item--chosen-swatch');
        }
        return renderSwatchItem(item, classList.join(' '));
      }
      default: return <div />
    }
  }
}

/**
 * @param {function} onAttributeSelect - Inform Attributes when a new item is selected
*/
class Attribute extends React.Component {

  render() {
    const { attribute, chosenAttribute } = this.props;
    // console.log('DEBUG :: attribute', attribute)
    // console.log('DEBUG :: chosenAttribute', chosenAttribute)
    return (
      <div className='attribute'>
        <p className="attribute__name">
          {attribute.name}{':'}
        </p>
        <div className="attribute__items">
          {attribute.items.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                type={attribute.type}
                chosen={item.id === chosenAttribute.item.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class Attributes extends React.Component {

  render() {
    const { attributes, chosenAttributes } = this.props;
    // console.log('INFO :: attributes :: ', attributes);
    // console.log('INFO :: chosenAttributes :: ', chosenAttributes);

    if (!this.props.attributes) return <div/> 

    return(
      <div>
        {this.props.attributes.map(
          (attribute) => {
            const _chosenAttribute = chosenAttributes.find((ca) => ca.id === attribute.id);
            return (
              <Attribute
                attribute={attribute}
                chosenAttribute={_chosenAttribute}
                key={window.crypto.randomUUID()}
              />
            )
          }
        )}
      </div>
    );
  }
}

export default Attributes;