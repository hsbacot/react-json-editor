import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import JSONEditor from './index';
import * as DotObject from 'dot-object';

export default class JEHarness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hunter: {
        name: "hunter",
        age: 26,
        random: {
          nested: true,
          brother: "Theo"
        },
        blank: {}
      }
    }
  }

  addNodeToObject = (key, value, keyPath) => {
    let path = [key, ...keyPath].reverse();
    let dotPath = path.join('.');
    //assign new key as unique
    this.setState(DotObject.copy('value', dotPath, { value }, this.state));
  };

  removeNodeFromObject = (keyPath) => {
    let path = [...keyPath].reverse();
    let dotPath = path.join('.');
    let stateCopy = Object.assign({}, this.state);
    DotObject.remove(dotPath, stateCopy);
    this.setState(stateCopy);
  };

  updateNodeValue = (value, keyPath) => {
    let path = [...keyPath].reverse();
    let dotPath = path.join('.');
    this.setState(DotObject.copy('value', dotPath, { value }, this.state));
  };

  updateNodeKey = (newKey, keyPath) => {
    let path = [...keyPath].reverse();
    let dotPath = path.join('.');
    let value = DotObject.pick(dotPath, this.state, true);
    path[path.length - 1] = newKey;
    let newDotPath = path.join('.');
    this.setState(DotObject.copy('value', newDotPath, { value }, this.state));
  };


  render() {
    return (
      <div>
        <JSONEditor data={this.state}
                  updateValue={this.updateNodeValue}
                  updateNodeKey={this.updateNodeKey}
                  removeNode={this.removeNodeFromObject}
                  addNode={this.addNodeToObject} hideRoot={true} />
      </div>
    )
  }
}
