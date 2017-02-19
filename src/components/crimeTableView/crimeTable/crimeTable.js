import React, {PropTypes} from 'react';
import ReactTable from 'react-table';

const TableView = ({filteredResults, columns}) => {
  return (
    <div>
      <ReactTable
        className="-highlight"
        data={filteredResults}
        columns={columns} />
    </div>
  );
};

TableView.propTypes = {
  filteredResults: PropTypes.array,
  columns: PropTypes.array
};

export default TableView;
