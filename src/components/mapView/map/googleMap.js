import React, {PropTypes} from 'react';
import GoogleMap from 'react-google-map';
import GoogleMapLoader from 'react-google-maps-loader';
import iconMarker from '../../../styles/pin_red.svg';
import iconMarkerHover from '../../../styles/iconMarkerHover.svg';


const apiKey = 'apiKey';

const Map = ({googleMaps}) => (
  <div className="map">
    <GoogleMap
    googleMaps={googleMaps}
    coordinates={[
        {
          title: "Toulouse",
          icon: iconMarker,
          position: {
            lat: 43.604363,
            lng: 1.443363,
          },
          onLoaded: (googleMaps, map, marker) => {
            // Set Marker animation
            marker.setAnimation(googleMaps.Animation.BOUNCE);

            // Define Marker InfoWindow
            const infoWindow = new googleMaps.InfoWindow({
              content: `
                <div>
                  <h3>Toulouse<h3>
                  <div>
                    Toulouse is the capital city of the southwestern
                    French department of Haute-Garonne,
                    as well as of the Occitanie region.
                  </div>
                </div>
              `,
            });

            // Open InfoWindow when Marker will be clicked
            googleMaps.event.addListener(marker, "click", () => {
              infoWindow.open(map, marker);
            });

            // Change icon when Marker will be hovered
            googleMaps.event.addListener(marker, "mouseover", () => {
              marker.setIcon(iconMarkerHover);
            });

            googleMaps.event.addListener(marker, "mouseout", () => {
              marker.setIcon(iconMarker);
            });

            // Open InfoWindow directly
            infoWindow.open(map, marker);
          },
        }
      ]}
    center={{lat: 43.604363, lng: 1.443363}}
    zoom={8}
    onLoaded={(googleMaps, map) => {
      map.setMapTypeId(googleMaps.MapTypeId.ROADMAP);
    }}
  />
  </div>
);

Map.propTypes = {
  googleMaps: PropTypes.object.isRequired
};

export default GoogleMapLoader(Map, {
  libraries: ['places'],
  key: apiKey
});
