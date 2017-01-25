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
    if(address.street) { //let's us know if user wants a specific location as the search point
      request('https://maps.googleapis.com/maps/api/geocode/json?address=' //Calls google api to change address to geographic coordinates
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
            let sources = list[address.state];
            let cityCount = 0; //Setting up count to make sure every city in the state is iterated through
            let apiCount = 0; //Setting up count to make sure every api in the city is iterated through
            let apiSize = 0; //Sets up total of api's needed to cycle through
            sources.forEach(function(city) { //To cycle through each city in the state
              let query = "?$where="
                          + city['query']['startDate']
                          + dates.start + "'"
                          + city['query']['endDate']
                          + dates.end + "'"
                          + city['query']['radius']
                          + latitude + ","
                          + longitude + ","
                          + distance.feet + ")"
                          + city['query']['order'];
              for(let apiUrl in city['apiUrl']) { //To cycle through each api in a city
                apiSize++;
                request(city['apiUrl'][apiUrl] + query, function(error, response, body) {
                  console.log('query: ', city['apiUrl'][apiUrl] + query);
                  if(error) {
                    res.send(error);
                  }
                  if(body) {
                    crimes.push(body);
                  }
                  if(response) {
                    apiCount++;
                  }
                  if(cityCount === sources.length && apiCount === apiSize) { //To make sure all api calls are finished before sending back to client
                    res.send(crimes);
                  }
                });
              }
              if(response) {
                cityCount++;
              }

            });
          }
        });
      } else { //in case user wants crime information for a particular city
      //If user wishes to get crime info for a whole city rather than radial search of a certain location
    }
  }
};
