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

/*
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="button-group">
        <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" onClick={toggle}><span>Select Column(s)</span><span className="caret"></span></button>
        <ul className="dropdown-menu">
          {columns.map((column) => {
            return <li key={column.header}><a data-value={column.header}><input type="checkbox" checked={column.show} value={column.header} onChange={onChange}/>&nbsp;{column.header}</a></li>;
          })}
        </ul>
      </div>
    </div>
  </div>
</div>
//
<div>
  <form>
    <label>Select Column(s)<span className="caret"></span></label>
    <ul>
      <li><input type="checkbox" value="selectAll" onChange={onChange}/>Select All</li>
      <li><input type="checkbox" value="deselectAll" onChange={onChange}/>Deselect All</li>
      {columns.map((column) => {
        return <li key={column.header}><a data-value={column.header}><input type="checkbox" checked={column.show} value={column.header} onChange={onChange} />{column.header}</a></li>;
      })}
    </ul>
  </form>
</div>
//
const ColumnSelection = ({columns, addChild, onChange, toggle}) => {

  const children = [];

  for(let i = 0; i < columns.length; i++) {
    children.push(<ColumnNames
                    columns={columns}
                    onChange={onChange} />);
  }

  return (
    <ColumnView addChild={addChild} toggle={toggle}>
      {children}
    </ColumnView>
  );
};
 */
