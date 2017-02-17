import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CrimeTableView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      crimes: Object.assign({}, this.props.crimes)
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.crimes != nextProps.crimes) {
      //f
    }
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

CrimeTableView.propTypes = {
  crimes: PropTypes.array
};

function crimeInstance(crimes) {
  const crime = crimes.map(crime => {
    return crime;
  });
  console.log('crime Instance: ', crime);
  return crime;
}

function mapStateToProps(state) {
  let crimes = [];
  console.log('checking store: ', state.soughtCrimes);
  if(state.soughtCrimes.length > 0) {
    crimes = crimeInstance(state.soughtCrimes);
  }
  console.log('');
  console.log('crimes: ', crimes);
  return {
    crimes: crimes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeTableView);
// export default connect(mapDispatchToProps)(CrimeTableView);
