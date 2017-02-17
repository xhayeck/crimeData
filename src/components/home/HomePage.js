import React from 'react';
import LocationBar from '../locationBar/ManageLocationBar.js';
import CrimeTableView from '../crimeTableView/ManageCrimeTableView.js';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <LocationBar /> {/*Where the user inputs data to query the Api's*/}
        <CrimeTableView /> {/*Where the crime stats are put into a table view for the user*/}
      </div>
    );
  }
}

export default HomePage;
