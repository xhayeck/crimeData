export default {
  soughtCrimes: [],
  ranges: [{date: 'Last 30 Days'}, {date: 'This Month'}, {date: 'Last Month'}, {date: 'This Quarter'}, {date: 'Last Quarter'}, {date: 'This Year'}, {date: 'Last Year'}],
  filteredCrimes: [],
  newCrimeCall: false,
  mapCenter: {"lat" : 47.6062095, "lng" : -122.3320708},
  cityInfo: [{
    city: 'Los Angeles, CA',
    show: {display: "none"},
    1: 'Only the datasets for the years between 2011 and 2016 are available. They have not started posting the dataset for 2017 yet.',
    2: ''
  }, {
    city: 'San Francisco, CA',
    show: {display: "none"},
    1: 'The dataset begins in 2003. They do continuously update their database so that the most up to date is two weeks prior from the current date.',
    2: ''
  }, {
    city: 'Chicago, IL',
    show: {display: "none"},
    1: 'The datasets begins in 2001. They do continuously update their database so that the most up to date is one week prior from the current date.',
    2: ''
  }, {
    city: 'New Orleans, LA',
    show: {display: "none"},
    1: 'No dataset provides geolocation for crime, so a radial search cannot, currently, be done.',
    2: 'The datasets begins in 2009. They do continuously update their database so that the most up to date is about one day prior from the current date.'
  }, {
    city: 'New York, NY',
    show: {display: "none"},
    1: 'Only the datasets for the years between 2006 and 2016 are available. They have not started posting the dataset for 2017 yet.',
    2: ''
  }, {
    city: 'Seattle,WA',
    show: {display: "none"},
    1:  'The dataset begins in Oct. of 2010 and is continuously updated to provide information to within the last few hours.',
    2: ''
  }]
};
