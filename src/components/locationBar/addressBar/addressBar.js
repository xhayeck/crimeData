import React, {PropTypes} from 'react';

const addressBar = ({address, onChange}) => {
  return (
    <form className="addressBar" role="form">
      <div className="form-group">
        <h3>Street Address</h3>
        <input
          type="text"
          className="form-control"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={onChange} />
      </div>
      <br />
      <div className="form-inline form-group">
        <div className="form-group">
          <h3>City</h3>
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={onChange} />
        </div>
        <div className="form-group">
          <h3>State</h3>
          <input
            type="text"
            className="form-control"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={onChange} />
        </div>
        <div className="form-group">
          <h3>Zip Code</h3>
          <input
            type="text"
            className="form-control"
            name="zip"
            placeholder="Zip Code"
            value={address.zip}
            onChange={onChange} />
        </div>
      </div>
    </form>
  );
};

addressBar.propTypes = {
  address: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default addressBar;
