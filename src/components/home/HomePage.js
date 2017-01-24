import React from 'react';
import LocationBar from '../locationBar/ManageLocationBar.js';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <LocationBar /> {/*Where the user inputs data to query the Api's*/}
      </div>
    );
  }
}

export default HomePage;
