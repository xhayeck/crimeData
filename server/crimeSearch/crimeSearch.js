let request = require('request');
let list = require('./stateList.js');

module.exports = {
  search: function(req, res) {
    let dataSearch = req.body;
    let address = dataSearch.address;
    let distance = dataSearch.distance;
    let dates = dataSearch.dates;
    let googleGeocodeApi = process.env.googleGeocodeApi; //google-geocoding api
    let crimes = [];
    if(address.street) {
      request('https://maps.googleapis.com/maps/api/geocode/json?address='
                + address.street
                + ','
                + address.city
                + ','
                + address.state
                + '&key='
                + googleGeocodeApi,
        function(error, response, body) {
          if(error) {
            res.send(error);
          } else if(!error && response.statusCode == 200) {
            body = JSON.parse(body);
            let latitude = body.results[0].geometry.location.lat;
            let longitude = body.results[0].geometry.location.lng;
            let query = "?$where="
                        + "date >= '" + dates.start + "'"
                        + "AND date <= '" + dates.end + "'"
                        + "AND within_circle(location,"+ latitude + "," + longitude + "," + distance.feet + ")"
                        + "&$order=date DESC";
                        // + "&$limit=100000";
            let sources = list[address.state];
            let count = 0;
            sources.forEach(function(city) {
              request(city.apiUrl + query, function(error, response, body) {
                if(error) {
                  res.send(error);
                }
                if(body) {
                  crimes.push(body);
                  count++;
                }
                if(count === sources.length) {
                  res.send(crimes);
                }
              });
            });
          }
        });
      }
    else {
      //If user wishes to get crime info for a whole city rather than radial search of a certain location
      // console.log('Address: ', address);
      // console.log('Dates: ', dates);
      // let query = '?$where='
      //             + ''
    }
  }
};
