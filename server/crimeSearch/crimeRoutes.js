let Crime = require('./crimeSearch.js');

module.exports = function(router) {
  router.post('/getCrime', Crime.search);
};
