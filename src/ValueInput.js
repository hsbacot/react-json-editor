import React, { PropTypes } from 'react';

export const ValueInput = props => {
  let valueInput;
  if (props.nodeType === 'Boolean') {
    valueInput = (
      <select onChange={props.updateNodeValue} value={props.newNodeValue}>
        <option value='false'>false</option>
        <option value='true'>true</option>
      </select>
    );
  } else {
    valueInput = <input onChange={props.updateNodeValue} value={props.newNodeValue} />;
  }
  return valueInput;
};

ValueInput.propTypes = {
  updateNodeValue: PropTypes.func,
  newNodeValue: PropTypes.any,
  nodeValue: PropTypes.any
};
