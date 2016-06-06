import React, { PropTypes } from 'react';
import { ValueInput } from './ValueInput';
import { ValueType } from './ValueType';

export const AddOptions = props => {
  const {
    newNodeKey,
    updateNodeKey,
    updateNodeValue,
    addNode,
    nodeType
    } = props;

  return (
    <div>
      <input onChange={updateNodeKey} value={newNodeKey} />:
      <ValueInput nodeType={nodeType} updateNodeValue={updateNodeValue} />
      <ValueType {...props} />
      <span onClick={addNode}>Add Node</span>
    </div>
  );
};

AddOptions.propTypes = {
  newNodeKey: PropTypes.string,
  newNodeValue: PropTypes.any,
  updateNodeKey: PropTypes.func,
  updateNodeValue: PropTypes.func,
  updateNodeType: PropTypes.func,
  addNode: PropTypes.func,
  nodeType: PropTypes.any
};
