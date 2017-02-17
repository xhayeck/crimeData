import React, {PropTypes} from 'react';

const SelectInput = ({ranges, options, onChange}) => {
  return (
    <select
      name="ranges"
      value={ranges.currentRange}
      onChange={onChange}>
      {options.slice(0).reverse().map((range) => {
        return <option key={range.range} value={range.range}>{range.range}</option>;
      })}
    </select>
  );
};

SelectInput.propTypes = {
  ranges: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default SelectInput;
