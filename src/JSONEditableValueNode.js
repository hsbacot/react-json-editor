import React, { PropTypes } from 'react';
import { ValueInput } from './ValueInput';
import { ValueType } from './ValueType';
import { valueAsType } from './utils/typeCasting';


export class JSONEditableValueNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editableKey: false,
      editableValue: false,
      newNodeValue: this.props.valueGetter(this.props.value),
      nodeType: this.props.nodeType,
      keyValue: this.props.labelRenderer(...this.props.keyPath)
    };
  }

  makeEditableKey = () => {
    this.setState({
      editableKey: true
    });
  };

  makeEditableValue = () => {
    this.setState({
      editableValue: true
    });
  };

  clickUpdateValue = () => {
    const newValue = valueAsType(this.state.newNodeValue, this.state.nodeType);
    this.setState({
      editableKey: false,
      editableValue: false
    });
    this.props.updateValue(newValue, this.props.keyPath);
    this.props.updateNodeKey(this.state.keyValue, this.props.keyPath);
  };

  updateLocalKey = (newKey) => {
    this.setState({
      keyValue: newKey
    });
  };

  handleNodeTypeUpdate = (e) => {
    this.setState({
      nodeType: e.target.value
    });
  };

  handleNodeValueInput = (e) => {
    this.setState({
      newNodeValue: e.target.value
    });
  };

  render() {
    const {
      nodeType,
      styling,
      labelRenderer,
      keyPath,
      valueRenderer,
      value,
      valueGetter,
      removeNode,
      } = this.props;

    const editableKey = this.state.editableKey ?
      <input
        {...styling(['label', 'valueLabel'], nodeType, keyPath)}
        value={this.state.keyValue}
        onChange={(e) => this.updateLocalKey(e.target.value, keyPath)}
      /> :
      <label
        {...styling(['label', 'valueLabel'], nodeType, keyPath)}
        onClick={this.makeEditableKey}
      >
        {labelRenderer(...keyPath)}
      </label>;

    const editableValue = this.state.editableValue ?
      <ValueInput
        nodeType={this.state.nodeType}
        updateNodeValue={this.handleNodeValueInput}
        newNodeValue={this.state.newNodeValue}
      /> :
      <span
        {...this.props.styling('valueText', nodeType, keyPath)}
        onClick={this.makeEditableValue}
      >
          {valueRenderer(valueGetter(value), value)}
      </span>;

    const typeSelector = this.state.editableValue ?
      <ValueType
        nodeType={this.state.nodeType}
        updateNodeType={this.handleNodeTypeUpdate}
      /> : null;

    const actionButton = this.state.editableKey || this.state.editableValue ?
      <span onClick={this.clickUpdateValue}>[update value]</span> :
      <span onClick={() => removeNode(keyPath)}>[x]</span>;

    return (
      <div>
        <li
          {...this.props.styling('value', nodeType, keyPath)}
        >
          {editableKey}:
          {editableValue}
          {typeSelector}
          {actionButton}
        </li>
      </div>
    );
  }
}

JSONEditableValueNode.propTypes = {
  nodeType: PropTypes.string.isRequired,
  styling: PropTypes.func.isRequired,
  labelRenderer: PropTypes.func.isRequired,
  keyPath: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  valueRenderer: PropTypes.func.isRequired,
  value: PropTypes.any,
  valueGetter: PropTypes.func,
  makeEditable: PropTypes.func,
  editableNode: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  updateValue: PropTypes.func,
  updateNodeKey: PropTypes.func,
  removeNode: PropTypes.func
};

JSONEditableValueNode.defaultProps = {
  valueGetter: value => value,
  editableNode: ''
};

export default JSONEditableValueNode;
