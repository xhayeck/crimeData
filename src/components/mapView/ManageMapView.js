import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import GoogleMapLoader from './map/googleMap.js';
import centerMarker from '../../styles/centerMarker.png';
import crimeMarker from '../../styles/crimeMarker.png';


class ManageMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      crimesArray: [], //crimes that will be showen on the map
      mapCenter: this.props.mapCenter, //sets the center location of the map
      fetched: true, //used to reset render window for the map
      zoom: 14 //setting zoom view on map
    };
  }

  componentWillReceiveProps(nextProps) {
    let zoom = nextProps.mapCenter.zoom; //grabs zoom level
    delete nextProps.mapCenter.zoom; //deletes zoom level from object

    let mapArray = JSON.parse(JSON.stringify(nextProps.filteredCrimes)); //create new space in memory rather than pointing to same space
    for(let i = 0; i < mapArray.length; i++) { //to cycle through each crime object in array
      let crimeObject = mapArray[i];
      for(let key in crimeObject) { //to cycle through each key in object
        if(key === 'Location') { //set where the crime marker will appear on map
          if(typeof crimeObject[key] === 'string') { //to make sure all location objects are standard
            let tempString = crimeObject[key];
            tempString = tempString.replace(/[(,)]/g, '');
            tempString = tempString.split(' ');
            for(let y = 0; y < tempString.length; y++) {
              tempString[y] = parseFloat(tempString[y]);
            }
            crimeObject[key] = {'coordinates': tempString};
          }
          let tempVal = crimeObject['Location']['coordinates'];
          let longitude;
          let latitude;
          for(let x = 0; x < tempVal.length; x++) {
            if(tempVal[x] < 0) { //assumption being made based on keeping this US only
              longitude = tempVal[x];
            } else {
              latitude = tempVal[x];
            }
          }
          crimeObject.position = {};
          crimeObject.position['lat'] = latitude;
          crimeObject.position['lng'] = longitude;
        }
        if(key === 'Description') {
          let description = crimeObject['Description'];
          crimeObject.title = "";
          crimeObject.title += description;
        }
      }
      delete crimeObject['Description'];
      delete crimeObject['Location'];
      crimeObject.icon = crimeMarker;
      crimeObject.onLoaded = function(googleMaps, map, marker) { //setting function for map to load crime
        let contentString = '<div>'
                          + '<h3>' + crimeObject['title'] + '</h3>'
                          + '<div>'
                          + '<p>' + crimeObject['Date'] + '</p>'
                          + '<p>' + crimeObject['Description'] + '</p>'
                          + '<p>' + crimeObject['Address'] + '</p>'
                          + '</div>'
                          + '</div>';
        const infoWindow = new googleMaps.InfoWindow({
          content: contentString
        });

        googleMaps.event.addListener(marker, "click", () => { // Open InfoWindow when Marker will be clicked
          infoWindow.open(map, marker);
        });

        googleMaps.event.addListener(marker, "mouseover", () => { // Change icon when Marker will be hovered
          marker.setAnimation(googleMaps.Animation.BOUNCE);
        });

        googleMaps.event.addListener(marker, "mouseout", () => { // Change icon when Marker will be unhovered
          marker.setAnimation(null);
        });
      };
    }

    let centerPosition = {}; //creates centerPosition object
    centerPosition.title = 'Center'; //sets the title
    centerPosition.icon = centerMarker; //sets the icon
    centerPosition.position = nextProps.mapCenter; //sets the center position
    mapArray.push(centerPosition); //places centerPosition object into crimes array

    this.setState({crimesArray: mapArray}); //sets the crimes to state
    this.setState({mapCenter: nextProps.mapCenter}); //sets the center of the map to state
    this.setState({zoom: zoom}); //sets the zoom level to state
    this.setState({fetched: false}, function() { //shuts down map render
      this.setState({fetched: true}); //brings back map render
    });
  }

  render() {
    return (
      <div>
        {this.state.fetched ?
        <GoogleMapLoader
          crimes={this.state.crimesArray}
          center={this.state.mapCenter}
          zoom={this.state.zoom} />
        : <div>Wow! You can read REALLY fast! How much wood would a woodchuck chuck, if a woodchuck could chuck wood?</div>}
      </div>
    );
  }
}

ManageMap.propTypes = {
  mapCenter: PropTypes.object
};

function mapStateToProps(state) {
  return {
    filteredCrimes: state.filteredCrimes,
    mapCenter: state.mapCenter
  };
}

export default connect(mapStateToProps)(ManageMap);
