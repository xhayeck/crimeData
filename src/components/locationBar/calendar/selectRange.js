import React, {PropTypes} from 'react';

const SelectInput = ({ranges, onChange}) => {
  return (
    <select
      name="ranges"
      value=""
      onChange={onChange}>
      {ranges.map((range) => {
        return <option key={range} value={range}>{range}</option>;
      })}
    </select>
  );
};

SelectInput.propTypes = {
  ranges: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default SelectInput;
