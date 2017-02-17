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
    if(address.street && address.city !== 'New Orleans') { //let's us know if user wants a specific location as the search point. New Orleans doesn't have l
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
              let streetQuery = city['query'];
              let query = "?$where="
                          + streetQuery['dateStart']
                          + dates.start
                          + streetQuery['timeStart']
                          + streetQuery['dateEnd']
                          + dates.end
                          + streetQuery['timeEnd']
                          + streetQuery['radiusStart']
                          + latitude
                          + ","
                          + longitude
                          + ","
                          + distance.meter
                          + ")"
                          + '&$limit=100000'
                          + streetQuery['dateOrder'];
              for(let apiUrl in city['apiUrl']) { //To cycle through each api in a city
                apiSize++;
                request(city['apiUrl'][apiUrl] + query, function(error, response, body) {
                  if(error) {
                    res.send(error);
                  }
                  let exist = body.search('message'); //Checks if api returns crime data or message from api stating an error happened because columns don't exist (if columns don't exist, then that's not the city we want)
                  if(exist === -1 && body.length > 3) { //checks if what was returned was proper crime data
                    crimes.push(JSON.parse(body));
                  }
                  if(response) {
                    apiCount++;
                  }
                  if(cityCount === sources.length && apiCount === apiSize) { //To make sure all api calls are finished before sending back to client
                    if(crimes.length > 1) {
                      for(let i = 1; i < crimes.length; i++) {
                        crimes[0] = crimes[0].concat(crimes[i]);
                      }
                      res.send(crimes[0]);
                    } else {
                      res.send(crimes);
                    }
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
               //OR city dataset does not provide longitude and latitude coordinates
        let cityCount = 0; //Setting up count to make sure every city in the state is iterated through
        let apiCount = 0; //Setting up count to make sure every api in the city is iterated through
        let apiSize = 0; //Sets up total of api's needed to cycle through
        let state = list[address.state];
        state.forEach(function(city) {
          let cityQuery = city['query'];
          let query = "?$where="
                      + cityQuery['dateStart']
                      + dates.start
                      + cityQuery['timeStart']
                      + cityQuery['dateEnd']
                      + dates.end
                      + cityQuery['timeEnd']
                      + cityQuery['dateOrder']
                      + '&$limit=100000';
          for(let apiUrl in city['apiUrl']) { //To cycle through each api in a city
            if(city['city'] === address.city) {
              apiSize++;
              request(city['apiUrl'][apiUrl] + query, function(error, response, body) {
                if(error) {
                  res.send(error);
                }
                let exist = body.search('message'); //Checks if api returns crime data or message from api stating an error happened because columns don't exist (if columns don't exist, then that's not the city we want)
                if(exist === -1 && body.length > 3) { //checks if what was returned was proper crime data
                  crimes.push(JSON.parse(body));
                }
                if(response) {
                  apiCount++;
                }
                if(cityCount === state.length && apiCount === apiSize) { //To make sure all api calls are finished before sending back to client
                  if(crimes.length > 1) {
                    for(let i = 1; i < crimes.length; i++) {
                      crimes[0] = crimes[0].concat(crimes[i]);
                    }
                    res.send(crimes[0]);
                  } else {
                    res.send(crimes);
                  }
                }
              });
            }
          }
          cityCount++;
      });
    }
  }
};
