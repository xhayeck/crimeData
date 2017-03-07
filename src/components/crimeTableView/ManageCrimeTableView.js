import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as filtering from '../../actions/filterActions.js';
import * as crimeCalls from '../../actions/crimeCallActions.js';
import TableView from './crimeTable/crimeTable.js';
import ColumnSelection from './crimeTable/columnSelection.js';
import ColumnFilter from './crimeTable/columnFilter.js';

class CrimeTableView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      apiCrimes: [], //holds all crimes from api call
      filteredCrimes: [], //holds crimes after user has filtered table (future feature)
      columns: [], //holds names and other information for table column names
      fetched: false, //used to reset render view for table. If false, then nothing renders, if true, then table renders
      selectAll: true, //if user has decided to have all columns visible in the table
      deselectAll: false, //if user has decided to have no columns visible in the table
      filterValues: {} //contains values that user is filtering for
    };

    this.filterColumns = this.filterColumns.bind(this);
    this.filterColumn = this.filterColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.crimeCall) { //Will go into when you click 'search' in the ManageLocationBar component and your states get updated
      this.props.callCrimeActions.crimeCall(false); //if false, let's redux know that call that's being made is not an api call
      this.setState({fetched: false});
      this.setState({apiCrimes: nextProps.apiCrimes});
      this.props.filteredActions.initialLoad(nextProps.apiCrimes); //sends filtered crimes to redux state
      this.setState({columns: []}, function() { //used to reset column names and other information
        let columns = [];
        let columnHeader = JSON.parse(JSON.stringify(this.state.apiCrimes[0])); //since all objects will have same keys, only need one object to obtain column names
        let index = 0;
        for(let key in columnHeader) {
          let column = {};
          column['header'] = key; //used to set column name
          column['accessor'] = key; //used to tell data in which column it goes
          column['index'] = index;
          index++;
          if(typeof columnHeader[key] === 'object') {
            column['expander'] = true; //because table cannot handle an object
            column['show'] = false; //set to hide column
            column['display'] = {display: "none"};
          } else {
            column['show']= true; //set to show column
            column['value'] = '';
            column['display'] = {display: "inline"};
          }
          if(key.includes('_')) {
            column['show'] = false;
          }
          columns.push(column);
        }
        this.setState({columns: columns}, function() { //'this.setState' is asynchronous, using nested functions for proper firing order
          this.setState({fetched: true}); //render table
        });
      });
    }
    if(!nextProps.crimeCall) { //Will go into it if the updated state happens on this component
      this.setState({fetched: false}, function() {
        this.setState({filteredCrimes: nextProps.filteredCrimes}, function() {
          this.setState({fetched: true});
        });
      });
    }
  }

  filterColumns(event) { //filter which columns are shown
    if(event.target.name === 'selectAll') {
      let columnSelection = this.state.columns;
      columnSelection.forEach((column) => {
        column.show = true;
        column.display = {display: "inline"};
      });
      this.setState({fetched: false}, function() {
        this.setState({selectAll: true}, function() {
          this.setState({deselectAll: false}, function() {
            this.setState({columns: columnSelection}, function() {
              this.setState({fetched: true});
            });
          });
        });
      });
    } else if(event.target.name === 'deselectAll') {
      let columnSelection = this.state.columns;
      columnSelection.forEach((column) => {
        column.show = false;
        column.display = {display: "none"};
      });
      this.setState({fetched: false}, function() {
        this.setState({selectAll: false}, function() {
          this.setState({deselectAll: true}, function() {
            this.setState({columns: columnSelection}, function() {
              this.setState({fetched: true});
            });
          });
        });
      });
    } else {
      let columnName = event.target.value;
      let columnSelection = this.state.columns;
      let columnIndex = columnSelection.findIndex(columnObject => columnObject.header === columnName);
      columnSelection[columnIndex].show = event.target.checked;
      if(columnSelection[columnIndex].show === false) {
        columnSelection[columnIndex].display = {display: "none"};
      } else {
        columnSelection[columnIndex].display = {display: "inline"};
      }
      this.setState({fetched: false}, function() {
        this.setState({selectAll: false}, function() {
          this.setState({deselectAll: false}, function() {
            this.setState({columns: columnSelection}, function() {
              this.setState({fetched: true});
            });
          });
        });
      });
    }
  }

  /*
  -Pseudocode for filterColumn function below:
    -collect name of column
    -collect value
    -check if column has been filtered
      -if column has been filtered:
        -change the value of the column
      -if column hasn't been filtered:
        -collect index
        -add column to object
          -add value to column object
          -add index to column object
    -set the filtered object to state
    -set the new value to state in the columns state array
    -create empty filter array
    -cycle through the api array
      -for each object in api array check the filtered object for each key and their values
        -if all filter objects return true
          -push api object to filter array
    send filter array through action to reducer to change state
   */

  filterColumn(event) {
    let columnName = event.target.name;
    let filterValue = event.target.value;
    let filterValues = this.state.filterValues;
    let columnArray = this.state.columns;
    let index;

    if(filterValues[columnName]) {
      filterValues[columnName]['value'] = filterValue;
      index = filterValues[columnName]['index'];
    } else if (!filterValues[columnName]) {
      for(let i = 0; i < columnArray.length; i++) {
        if(columnArray[i]['header'] === columnName) {
          index = i;
        }
      }
      filterValues[columnName] = {'value': filterValue, 'index': index};
    }
    this.setState({filterValues: filterValues});

    let current = columnArray[index];
    current.value = filterValue;
    this.setState({columns: columnArray});

    let filteredArray = [];
    let crimeApi = this.state.apiCrimes;
    for(let x = 0; x < crimeApi.length; x++) {
      let crimeObj = crimeApi[x];
      let canFilter = true;
      for(let crimeKey in filterValues) {
        let stat = crimeObj[crimeKey].toLowerCase();
        let searchingFor = filterValues[crimeKey]['value'];
        let columnIndex = filterValues[crimeKey]['index'];
        let currentColumn = columnArray[columnIndex];
        let activeColumn = currentColumn['show'];
        searchingFor = searchingFor.toLowerCase();
        if(activeColumn === true && !stat.includes(searchingFor)){ //checks to make sure the column is currently being dispalyed and the value user wants does not exist
          canFilter = false;
        }
      }
      if(canFilter) {
        filteredArray.push(crimeObj);
      }
    }
    this.props.filteredActions.filteringCrime(filteredArray);
  }

  render() {
    return (
      <div>
        <div> {/*What will be shown when allowed to render*/}
          <div className="form-inline">
            <div className="form-group">
              <ColumnSelection
                columns={this.state.columns}
                onChange={this.filterColumns}
                selectAll={this.state.selectAll}
                deselectAll={this.state.deselectAll} /> {/*Component to filter which columns will be shown*/}
            </div>
          </div>
          <br />
          <ColumnFilter
            onChange={this.filterColumn}
            columns={this.state.columns} />
          {this.state.fetched ?
            <div>
              <TableView
                filteredResults={this.state.filteredCrimes}
                columns={this.state.columns} /> {/*Component that renders table*/}
            </div>
          : (<div></div>)} {/*What will be shown when table not allowed to render*/}
        </div>
      </div>
    );
  }
}

CrimeTableView.propTypes = {
  apiCrimes: PropTypes.array,
  filteredCrimes: PropTypes.array,
  filteredActions: PropTypes.object.isRequired,
  callCrimeActions: PropTypes.object.isRequired,
  crimeCall: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    apiCrimes: state.soughtCrimes,
    filteredCrimes: state.filteredCrimes,
    crimeCall: state.crimeCall
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callCrimeActions: bindActionCreators(crimeCalls, dispatch),
    filteredActions: bindActionCreators(filtering, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeTableView);
