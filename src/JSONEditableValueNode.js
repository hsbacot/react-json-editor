import React, { PropTypes } from 'react';


export class JSONEditableValueNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editableKey: false,
      editableValue: false,
      keyValue: this.props.labelRenderer(...this.props.keyPath)
    }

  }

  makeEditableKey = () => {
    console.log('kasdf');
    this.setState({
      editableKey: true
    })
  };

  makeEditableValue = () => {
    this.setState({
      editableValue: true
    })
  };

  clickUpdateValue = () => {
    this.setState({
      editableKey: false,
      editableValue: false
    });
    this.props.updateNodeKey(this.state.keyValue, this.props.keyPath);
  };

  updateLocalKey = (newKey) => {
    this.setState({
      keyValue: newKey
    })
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
      updateValue,
      updateNodeKey,
      updateNodeValue,
      removeNode,
      } = this.props;

      const editableKey = this.state.editableKey ?
        <input {...styling(['label', 'valueLabel'], nodeType, keyPath)}
          value={this.state.keyValue}
          onChange={(e) => this.updateLocalKey(e.target.value, keyPath)} /> :
        <label {...styling(['label', 'valueLabel'], nodeType, keyPath)} onClick={this.makeEditableKey}>
          {labelRenderer(...keyPath)}
        </label>;

       const editableValue = this.state.editableValue ?
        <input {...styling('valueText', nodeType, keyPath)}
            onChange={(e) => updateValue(e.target.value, keyPath)}
            value={valueRenderer(valueGetter(value), value)}/> :
          <span {...this.props.styling('valueText', nodeType, keyPath)} onClick={this.makeEditableValue}>
            {valueRenderer(valueGetter(value), value)}
          </span>;

      const actionButton = this.state.editableKey || this.state.editableValue ?
        <button onClick={this.clickUpdateValue}>Update Value</button> :
        <button onClick={() => removeNode(keyPath)}>X</button>;

    return (
      <div>
        <li
          {...this.props.styling('value', nodeType, keyPath)}
        >
          { editableKey }:
          { editableValue }
          { actionButton }
        </li>
      </div>
    )
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
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
};

JSONEditableValueNode.defaultProps = {
  valueGetter: value => value,
  editableNode: ''
};

export default JSONEditableValueNode;
