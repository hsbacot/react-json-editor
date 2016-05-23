import React, { PropTypes } from 'react';
import { valueAsType } from './utils/typeCasting';

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

  const types = ['String', 'Object', 'Number', 'Boolean', 'Array', 'Null', 'Undefined'];

  let nodeTypes = types.map( type =>  <option value={type}>{type}</option> );

  let valueInput;
  if(nodeType === 'Boolean') {
    valueInput = (
      <select onChange={updateNodeValue} value={newNodeValue}>
        <option value={false}>false</option>
        <option value={true}>true</option>
      </select>
    )
  } else {
    valueInput = <input onChange={updateNodeValue} value={newNodeValue}/>;
  }

  return (
    <div>
      <input onChange={updateNodeKey} value={newNodeKey}/>:
      { valueInput }
      <select value={nodeType} onChange={updateNodeType} >{nodeTypes}</select>
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
    valueAsType(this.state.newNodeValue, this.state.newNodeType).then( newNodeValue => {
      let newNode = {};
      newNode[`${this.state.newNodeKey}`] = newNodeValue;
      this.props.addNode(this.state.newNodeKey, newNodeValue, this.props.keyPath);
    }).catch( err => {
      console.log(err);
    });
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