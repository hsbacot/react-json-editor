import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import JSONTree from './index';
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

  addNodeToObject = (value, keyPath) => {
    let path = [Date.now().toString(), ...keyPath].reverse();
    let dotPath = path.join('.');
    //assign new key ass unique
    this.setState(DotObject.copy('value', dotPath, { value }, this.state));
  };

  updateNodeValue = (value, keyPath) => {
    let path = [...keyPath].reverse();
    let dotPath = path.join('.');
    this.setState(DotObject.copy('value', dotPath, { value }, this.state));
  };


  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state)}</pre>
        <JSONTree data={this.state} updateValue={this.updateNodeValue} addNode={this.addNodeToObject} hideRoot={true} />
      </div>
    )
  }
}
