import React, { PropTypes } from 'react';

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

const JSONEditableValueNode = ({
  nodeType,
  styling,
  labelRenderer,
  keyPath,
  valueRenderer,
  value,
  valueGetter,
  handleClick,
  updateValue
  }) => (
  <li
    {...styling('value', nodeType, keyPath)}
  >
    <label {...styling(['label', 'valueLabel'], nodeType, keyPath)}>
      {labelRenderer(...keyPath)}:
    </label>
    <input {...styling('valueText', nodeType, keyPath)}
      onClick={handleClick}
      onChange={(e) => updateValue(e.target.value, keyPath)}
      value={valueRenderer(valueGetter(value), value)}/>
  </li>
);

JSONEditableValueNode.propTypes = {
  nodeType: PropTypes.string.isRequired,
  styling: PropTypes.func.isRequired,
  labelRenderer: PropTypes.func.isRequired,
  keyPath: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  valueRenderer: PropTypes.func.isRequired,
  value: PropTypes.any,
  valueGetter: PropTypes.func
};

JSONEditableValueNode.defaultProps = {
  valueGetter: value => value,
  handleClick: () => console.log('hunter')
};

export default JSONEditableValueNode;
