import React from 'react';
import {connect} from 'react-redux';
import GoogleMapLoader from './map/googleMap.js';


class ManageMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filteredCrimes: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filteredCrimes: nextProps.filteredCrimes});
  }

  render() {
    return (
      <div>
        <GoogleMapLoader />
      </div>
    );
  }
}

// ManageMap.propTypes = {
//   google: PropTypes.
// }

function mapStateToProps(state) {
  return {
    filteredCrimes:state.filteredCrimes
  };
}

export default connect(mapStateToProps)(ManageMap);
