import React, { PropTypes } from 'react';
import { valueAsType, JSONtypes } from './utils/typeCasting';
import { ValueInput } from './ValueInput';
import { ValueType } from './ValueType';

const AddOptions = props => {
  const {
    newNodeKey,
    newNodeValue,
    updateNodeKey,
    updateNodeValue,
    updateNodeType,
    addNode,
    nodeType
  } = props;

  let nodeTypes = JSONtypes.map( type =>  <option value={type}>{type}</option> );

  return (
    <div>
      <input onChange={updateNodeKey} value={newNodeKey}/>:
      <ValueInput nodeType={nodeType} updateNodeValue={updateNodeValue} />
      <ValueType {...props} />
      <button onClick={addNode}>Add Node</button>
    </div>
  )
};

export class JSONAddNode  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddOptions: false,
      newNodeType: 'String',
      newNodeKey: '',
      newNodeValue: ''
    }
  }

  showAddType = () => {
    this.setState({
      showAddOptions: true
    })
  };

  handleNodeKeyInput = (e) => {
    this.setState({
      newNodeKey: e.target.value
    })

  };

  handleNodeValueInput = (e) => {
    this.setState({
      newNodeValue: e.target.value
    })
  };

  handleAddNode = () => {
    let newNode = {};
    let newNodeValue = valueAsType(this.state.newNodeValue, this.state.newNodeType);
    newNode[`${this.state.newNodeKey}`] = newNodeValue;
    this.props.addNode(this.state.newNodeKey, newNodeValue, this.props.keyPath);
    this.setState({
      showAddOptions: false
    })

  };

  handleNodeTypeUpdate = (e) => {
    this.setState({
      newNodeType: e.target.value
    })
  };


  render() {

    return (
      <div>
        { this.state.showAddOptions ? <AddOptions addNode={this.handleAddNode}
                                                  nodeType={this.state.newNodeType}
                                                  updateNodeType={this.handleNodeTypeUpdate}
                                                  newNodeKey={this.state.newNodeKey}
                                                  newNodeValue={this.state.newNodeValue}
                                                  updateNodeKey={this.handleNodeKeyInput}
                                                  updateNodeValue={this.handleNodeValueInput} />
          : <span onClick={this.showAddType}> + Add Node</span> }

      </div>
    )
  }
}

JSONAddNode.propTypes = {
  keyPath: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired
};

export default JSONAddNode;