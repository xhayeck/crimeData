import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CityList from './cities/cityList.js';
import CityInfo from './cities/cityInfo.js';
import {bindActionCreators} from 'redux';
import * as cityInfo from '../../actions/cityActions.js';

class ManageHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cityInfo: this.props.cityInfo
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({cityInfo: nextProps.cityInfo});
  }

  onClick(cityName) {
    let citiesArray = JSON.parse(JSON.stringify(this.state.cityInfo));
    for(let i = 0; i < citiesArray.length; i++) {
      if(citiesArray[i]['city'] === cityName) {
        if(citiesArray[i]['show']['display'] === "inline") {
          citiesArray[i]['show'] = {display: "none"};
        } else {
          citiesArray[i]['show'] = {display: "inline"};
        }
      } else {
        citiesArray[i]['show'] = {display: "none"};
      }
    }
    this.props.cityActions.updateCityShow(citiesArray);
  }

  render() {
    return (
      <div>
        <h1>Where We Live</h1>
        <CityList
          cityName={this.state.cityInfo}
          onClick={this.onClick} />
        <CityInfo
          cityInfo={this.state.cityInfo} />
      </div>
    );
  }
}

ManageHeader.propTypes = {
  cityInfo: PropTypes.array.isRequired,
  cityActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cityInfo: state.cityInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cityActions: bindActionCreators(cityInfo, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageHeader);
