import React, {PropTypes} from 'react';
import SelectInput from './selectRange.js';

const Calendar = ({dates, onChange}) => {
  return (
    <div className="daterange form-inline">
      <div className="form-group">
      <h4>Start Date</h4>
      <input
        type="date"
        name="start"
        value={dates.start}
        onChange={onChange} />
    </div>
    <div className="form-group">
      <h4>End Date</h4>
      <input
        type="date"
        name="end"
        value={dates.end}
        onChange={onChange} />
    </div>
    <div className="form-group">
      <SelectInput
        ranges={dates.ranges}
        onChange={onChange} />
    </div>
    </div>
  );
};

Calendar.propTypes = {
  dates: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Calendar;
