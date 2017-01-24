/*
Turns out, the query search is not universal for all datasets. This means a query must be made for each individual data set.
*/

module.exports = {
  "CA": [
    {
      "city": "San Francisco",
      "apiUrl": { //Key(s) represent date(s) that that particular dataset has
        "2003ToPresent": "https://data.sfgov.org/resource/cuks-n6tp.json"
      },
      "url": "https://data.sfgov.org/browse?category=Public+Safety&limitTo=datasets&tags=crime"
      // "query": "?$where="
      //             + "date >= '" + dates.start + "'"
      //             + "AND date <= '" + dates.end + "'"
      //             + "AND within_circle(location,"+ latitude + "," + longitude + "," + distance.feet + ")"
      //             + "&$order=date DESC"
      //             + "&$limit=100000"
    }
  ],
  "IL": [
    {
      "city": "Chicago",
      "apiUrl": { //Key(s) represent date(s) that that particular dataset has
        "2001ToPresent": "https://data.cityofchicago.org/resource/6zsd-86xi.json"
      },
      "url": "https://data.cityofchicago.org/browse?category=Public+Safety&limitTo=datasets"
    }
  ],
  "WA": [
    {
      "city": "Seattle",
      "apiUrl": { //Key(s) represent date(s) that that particular dataset has
        "Aug2011ToPresent": "https://data.seattle.gov/resource/y7pv-r3kh.json"
      },
      "url": "https://data.seattle.gov/browse?category=Public+Safety&limitTo=datasets&tags=police+report"
    }
  ]
};
