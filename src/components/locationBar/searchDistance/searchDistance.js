import React, {PropTypes} from 'react';

const searchDistance = ({distance, onChange}) => {
  return (
    <form className="sliderBody">
      <label htmlFor="dist range-slider">Radial Distance: <br />
      <output htmlFor="dist range-slider">{distance.feet} ft. / {distance.mile} mi. ({distance.meter} m / {distance.km} km)</output></label>
      <br />
        <input
          id="range-slider"
          className=""
          name="feet"
          type="range"
          min="1"
          max="5280"
          value={distance.feet}
          step="1"
          aria-valuemin="1"
          aria-valuemax="5280"
          aria-valuenow="2640"
          onChange={onChange} />
    </form>
  );
};

searchDistance.propTypes = {
  onChange: PropTypes.func.isRequired,
  distance: PropTypes.object
};

export default searchDistance;
