import React, {PropTypes} from 'react';

const searchButton = ({onSubmit}) => {
  return (
    <div>
      <input
        type="submit"
        value="Search"
        className="btn btn-primary"
        onClick={onSubmit} />
    </div>
  );
};

searchButton.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default searchButton;
