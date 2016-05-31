import React from 'react';
import JSONEditor from './index';
import * as DotObject from 'dot-object';

export default class JEHarness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hunter: {
        name: 'hunter',
        age: 26,
        random: {
          nested: true,
          brother: 'Theo'
        },
        blank: {}
      }
    };
  }

  addNodeToObject = (key, value, keyPath) => {
    const path = [key, ...keyPath].reverse();
    const dotPath = path.join('.');
    // assign new key as unique
    this.setState(DotObject.copy('value', dotPath, { value }, this.state));
  };

  removeNodeFromObject = (keyPath) => {
    const path = [...keyPath].reverse();
    const dotPath = path.join('.');
    const stateCopy = Object.assign({}, this.state);
    DotObject.remove(dotPath, stateCopy);
    this.setState(stateCopy);
  };

  updateNodeValue = (value, keyPath) => {
    const path = [...keyPath].reverse();
    const dotPath = path.join('.');
    this.setState(DotObject.copy('value', dotPath, { value }, this.state));
  };

  updateNodeKey = (newKey, keyPath) => {
    const path = [...keyPath].reverse();
    const dotPath = path.join('.');
    const value = DotObject.pick(dotPath, this.state, true);
    path[path.length - 1] = newKey;
    const newDotPath = path.join('.');
    this.setState(DotObject.copy('value', newDotPath, { value }, this.state));
  };


  render() {
    return (
      <div>
        <JSONEditor
          data={this.state}
          updateValue={this.updateNodeValue}
          updateNodeKey={this.updateNodeKey}
          removeNode={this.removeNodeFromObject}
          addNode={this.addNodeToObject}
        />
      </div>
    );
  }
}
