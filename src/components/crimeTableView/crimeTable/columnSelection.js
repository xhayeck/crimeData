import React, {PropTypes} from 'react';

const ColumnSelection = ({columns, onChange, selectAll, deselectAll}) => {
return (
    <div>
      <form className="form-group">
        <label>Select Column(s)<span className="caret"></span></label>
        <ul className="form-inline form-group">
          <li className="form-inline form-group"><input type="checkbox" checked={selectAll} name="selectAll" onChange={onChange} className="form-control"/>Select All</li>
          <li className="form-inline form-group"><input type="checkbox" checked={deselectAll} name="deselectAll" onChange={onChange} className="form-control"/>Deselect All</li>
          {columns.map((column) => {
            return (<li key={column.header} className="form-inline form-group">
                      <a data-value={column.header}>
                        <input type="checkbox" checked={column.show} value={column.header} onChange={onChange} className="form-control"/>
                          {column.header}
                      </a>
                    </li>);
          })}
        </ul>
      </form>
    </div>
  );
};

ColumnSelection.propTypes = {
  columns: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectAll: PropTypes.bool.isRequired,
  deselectAll: PropTypes.bool.isRequired
};

export default ColumnSelection;
