import React, { PropTypes } from 'react';
import { valueAsType, JSONtypes } from './utils/typeCasting';

export const ValueInput = props => {
  let valueInput;
  if(props.nodeType === 'Boolean') {
    valueInput = (
      <select onChange={props.updateNodeValue} value={props.newNodeValue}>
        <option value={false}>false</option>
        <option value={true}>true</option>
      </select>
    )
  } else {
    valueInput = <input onChange={props.updateNodeValue} value={props.newNodeValue}/>;
  }
  return valueInput;
};

