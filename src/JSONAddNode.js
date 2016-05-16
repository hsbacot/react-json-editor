import React, { PropTypes } from 'react';

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

  const types = ['String', 'Object', 'Number', 'Boolean', 'Array'];

  let nodeTypes = types.map( type =>  <option value={type}>{type}</option> );

  return (
    <div>
      <input onChange={updateNodeKey} value={newNodeKey}/>:
      <input onChange={updateNodeValue} value={newNodeValue}/>
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