module.exports = {
  search: function(req, res) {
    let dataSearch = req.body;
    let address = dataSearch.address;
    let distance = dataSearch.distance;
    let dates = dataSearch.dates;
    //https://data.seattle.gov/resource/y7pv-r3kh.geojson
    if(address.street) {
      console.log('Address: ', address);
      console.log('Distance: ', distance);
      console.log('Dates: ', dates);
      let locationQuery = function() {

      }();
      console.log('locationQuery: ', locationQuery);
      let query = "?$where="
                  + "date >= '" + dates.start + "'"
                  + "AND date <= '" + dates.end + "'"
                  + "";

    } else {
      //If user wishes to get crime info for a whole city rather than radial search of a certain location
      console.log('Address: ', address);
      console.log('Dates: ', dates);
      // let query = '?$where='
      //             + ''
    }
    res.send({word: 'In the server!'});
  }
};
