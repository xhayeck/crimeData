import React, {PropTypes} from 'react';

const ColumnFilter = ({onChange, columns}) => {
  return (
    <div>
      Filter:
      <br />
      {columns.map(column => {
        return <input key={column['index']} type="text" name={column['header']} style={column['display']} placeholder={column['header']} onChange={onChange} value={columns['value']} />;
      })}
    </div>
  );
};

ColumnFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired
};

export default ColumnFilter;
