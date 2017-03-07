import React, {PropTypes} from 'react';

const CityList = ({cityName, onClick}) => {
  return(
    <div>
      Click For City Dataset information:
      <div className="container-fluid">
      {cityName.map((city) => {
        return(
          <span key={city['city']} className="col-md-2">
            <h5 onClick={onClick.bind(null, city['city'])}>{city['city']}</h5>
          </span>
        );
      })}
      </div>
    </div>
  );
};

CityList.propTypes = {
  cityName: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CityList;
