import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as filtering from '../../actions/filterActions.js';
import * as crimeCalls from '../../actions/crimeCallActions.js';
import TableView from './crimeTable/crimeTable.js';
import ColumnSelection from './crimeTable/columnSelection.js';

class CrimeTableView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      apiCrimes: [], //holds all crimes from api call
      filteredCrimes: [], //holds crimes after user has filtered table (future feature)
      columns: [], //holds names and other information for table column names
      fetched: false, //used to reset render view for table. If false, then nothing renders, if true, then table renders
      selectAll: true, //if user has decided to have all columns visible in the table
      deselectAll: false //if user has decided to have no columns visible in the table
    };

    this.filterColumns = this.filterColumns.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.crimeCall) { //Will go into when you click 'search' in the ManageLocationBar component and your states get updated
      this.setState({fetched: false});
      this.setState({apiCrimes: nextProps.apiCrimes});
      this.props.filteredActions.initialLoad(nextProps.apiCrimes); //sends filtered crimes to redux state
      this.props.callCrimeActions.crimeCall(false); //if false, let's redux know that call that's being made is not an api call
    }
    if(!nextProps.crimeCall) { //Will go into it if the updated state happens on this component
      this.setState({filteredCrimes: nextProps.filteredCrimes}); //setting up
      this.setState({columns: []}, function() { //used to reset column names and other information
        let columns = [];
        let columnHeader = nextProps.filteredCrimes[0]; //since all objects will have same keys, only need one object to obtain column names
        for(let key in columnHeader) {
          let column = {};
          column['header'] = key; //used to set column name
          column['accessor'] = key; //used to tell data in which column it goes
          if(typeof columnHeader[key] === 'object') {
            column['expander'] = true; //because table cannot handle an object
            column['show'] = false; //set to hide column
          } else {
            column['show']= true; //set to show column
          }
          columns.push(column);
        }
        this.setState({columns: columns}, function() { //'this.setState' is asynchronous, using nested functions for proper firing order
          this.setState({fetched: true}); //render table
        });
      });
    }
  }

  filterColumns(event) { //filter which columns are shown
    if(event.target.name === 'selectAll') {
      let columnSelection = this.state.columns;
      columnSelection.forEach((column) => {
        column.show = true;
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

  render() {
    return (
      <div>
        {this.state.fetched ?
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
              <TableView
                filteredResults={this.state.filteredCrimes}
                columns={this.state.columns} /> {/*Component that renders table*/}
            </div>
            : (<div>Let's Find Some Crime!</div>)} {/*What will be shown when table not allowed to render*/}
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
