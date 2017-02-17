import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as crimeActions from '../../actions/crimeActions.js';
import AddressBar from './addressBar/addressBar.js';
import SearchDistance from './searchDistance/searchDistance.js';
import Calendar from './calendar/calendar.js';
import SearchButton from './searchButton/searchButton.js';
import {rangesFormattedForDropdown} from '../../selectors/selectors.js';

class ManageLocationBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      address: Object.assign({}, this.props.address),
      distance: Object.assign({}, this.props.distance),
      dates: Object.assign({}, this.props.dates)

    };

    this.updateAddressState = this.updateAddressState.bind(this);
    this.updateDistanceState = this.updateDistanceState.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateAddressState(event) {
    const field = event.target.name;
    let address = this.state.address;
    address[field] = event.target.value;
    return this.setState({address: address});
  }

  updateDistanceState(event) {
    const field = event.target.name;
    let distance = this.state.distance;
    distance[field] = event.target.value;
    let meters = Math.round((distance[field] * .3048) * 100) / 100;
    let miles = Math.round((distance[field]/5280) * 100) / 100;
    let km = Math.round((meters/1000) * 100) / 100;
    distance['km'] = km;
    distance['mile'] = miles;
    distance['meter'] = meters;
    return this.setState({distance: distance});
  }

  updateDate(event) {
    const field = event.target.name;
    let dates = this.state.dates;
    if(field === 'ranges') {
      dates[field] = event.target.value;
      dates['start'] = dateOptions(dates[field], 0);
      dates['end'] = dateOptions(dates[field], 1);
      dates['currentRange'] = event.target.value;
    } else {
      dates[field] = event.target.value;
    }
    return this.setState({dates: dates});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.actions.getCrime({address: this.state.address, distance: this.state.distance, dates: this.state.dates})
      .catch(error => {
        console.error('error: ', error);
      });
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <AddressBar
            address={this.state.address}
            onChange={this.updateAddressState} /> {/*Component for user inputing the location they wish to search*/}
        </div>
        <div className="form-group">
          <SearchDistance
            distance={this.state.distance}
            onChange={this.updateDistanceState} /> {/*Component for user inputing the radial distance they wish to search*/}
        </div>
        <div className="form-group">
          <Calendar
            dates={this.state.dates}
            ranges={this.props.ranges}
            onChange={this.updateDate} /> {/*Component for user inputing the dates they wish to search*/}
        </div>
        <div className="form-group">
          <SearchButton
            onSubmit={this.onSubmit} /> {/*Component for user to send query information to the server*/}
        </div>
      </div>
    );
  }
}

ManageLocationBar.propTypes = {
  address: PropTypes.object.isRequired,
  distance: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  ranges: PropTypes.array.isRequired
};

function dateOptions(key, index) {
  const ranges = {
    'keys': ['Last 30 Days', 'This Month', 'Last Month', 'This Quarter', 'Last Quarter', 'This Year', 'Last Year'],
    'Last 30 Days': [moment().subtract(29, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    'This Month': [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
    'Last Month': [moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'), moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')],
    'This Quarter': [moment().startOf('quarter').format('YYYY-MM-DD'), moment().endOf('quarter').format('YYYY-MM-DD')],
    'Last Quarter': [moment().subtract(3, 'months').startOf('quarter').format('YYYY-MM-DD'), moment().subtract(3, 'months').endOf('quarter').format('YYYY-MM-DD')],
    'This Year': [moment().startOf('year').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    'Last Year': [moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'), moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')]
  };
  if(key === 'keys' && index === undefined) {
    return ranges['keys'];
  }
  return ranges[key][index];
}

function mapStateToProps(state, ownProps) {
  const location = ownProps.params; //should be from path '/:address' in routes. Idea is to later allow address to act as website address as well
  let address = {'street': '', 'city': '', 'state': '', 'zip': ''};
  let distance = {'feet': 2640, 'meter': 804.67, 'mile': .5, 'km': .80};
  let dates = {'start': dateOptions('Last 30 Days', 0), 'end': dateOptions('Last 30 Days', 1), 'ranges': dateOptions('keys'), currentRange: dateOptions('keys', 0)};
  if(location) {
    address = location;
  }
  return {
    address: address,
    distance: distance,
    dates: dates,
    ranges: rangesFormattedForDropdown(state.ranges)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crimeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLocationBar);
