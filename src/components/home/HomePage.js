import React from 'react';
import LocationBar from '../locationBar/ManageLocationBar.js';
import CrimeTableView from '../crimeTableView/ManageCrimeTableView.js';
import ManageMap from '../mapView/ManageMapView.js';
import ManageHeader from '../header/ManageHeader.js';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <ManageHeader />
        <br />
        <LocationBar /> {/*Where the user inputs data to query the Api's*/}
        <br />
        <ManageMap /> {/*Where crime data will be shown to the user on a map*/}
        <br />
        <CrimeTableView /> {/*Where the crime stats are put into a table view for the user*/}
      </div>
    );
  }
}

export default HomePage;
