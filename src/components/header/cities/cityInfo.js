import React, {PropTypes} from 'react';

const CityInfo = ({cityInfo}) => {
  return (
    <div>
      {cityInfo.map((city) => {
        return (
          <div key={city['city']} style={city['show']} className="form-inline form-group">
            <p>{city['1']}</p>
            <p>{city['2']}</p>
          </div>);
      })}
    </div>
  );
};

CityInfo.propTypes = {
  cityInfo: PropTypes.array.isRequired
};

export default CityInfo;
