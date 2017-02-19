import React from 'react';
import {connect} from 'react-redux';


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
        MAP!!!
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filteredCrimes:state.filteredCrimes
  };
}

export default connect(mapStateToProps)(ManageMap);
