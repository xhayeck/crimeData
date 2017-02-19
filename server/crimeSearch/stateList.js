/*
Turns out, the query search is not universal for all datasets. This means a query must be made for each individual data set.
The 'apiUrl' will hold the api for each dataset that a city has available
The key(s) in the 'apiUrl' object represent the date(s) that that particular dataset has
The 'url' is where you can find a list of the available datasets for that city
*/

module.exports = {
  "ca": [
    {
      "city": "los angeles",
      "apiUrl": {
        "2011": "https://data.lacity.org/resource/a7yi-qdzt.json",
        "2012thru2015": "https://data.lacity.org/resource/y9pe-qdrd.json",
        "2016": "https://data.lacity.org/resource/kh8g-6365.json"
      },
      "url": "https://data.lacity.org/browse?limitTo=datasets&tags=crime",
      "query": {
        "dateStart": "date_occ >= '",
        "timeStart": "'",
        "dateEnd": "AND date_occ <= '",
        "timeEnd": "'",
        "radiusStart": "AND within_circle(location_1,",
        "dateOrder": "&$order=date_occ DESC"
      }
    },
    {
      "city": "san francisco",
      "apiUrl": {
        "2003ToPresent": "https://data.sfgov.org/resource/cuks-n6tp.json"
      },
      "url": "https://data.sfgov.org/browse?category=Public+Safety&limitTo=datasets&tags=crime",
      "query": {
        "dateStart": "date >= '",
        "timeStart": "'",
        "dateEnd": "AND date <= '",
        "timeEnd": "'",
        "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=date DESC"
      }
    }
  ],
  "il": [
    {
      "city": "chicago", //Chicago doesn't always use longitude or latitude to mark on the dataset where the crime happened
      "apiUrl": {
        "2001ToPresent": "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        "oneYearPriorToPresent": "https://data.cityofchicago.org/resource/3uz7-d32j.json"
      },
      "url": "https://data.cityofchicago.org/browse?category=Public+Safety&limitTo=datasets",
      "query": {
        "dateStart": "date_of_occurrence between '",
        "timeStart": "T00:00:00' ",
        "dateEnd": "and '",
        "timeEnd": "T23:59:59' ",
        "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=date_of_occurrence DESC"
      }
    }
  ],
  "la": [
    {
      "city": "new orleans", //New Orleans doesn't use longitude or latitude to mark on the dataset where the crime happened
      "apiUrl": {
        "2010": "https://data.nola.gov/resource/tevm-gbnt.json",
        "2011": "https://data.nola.gov/resource/pqss-ewcr.json",
        "2012": "https://data.nola.gov/resource/tfxy-bm4w.json",
        "2013": "https://data.nola.gov/resource/va7g-8exu.json",
        "2014": "https://data.nola.gov/resource/5fva-6hve.json",
        "2015": "https://data.nola.gov/resource/ti4p-d4i8.json",
        "2016": "https://data.nola.gov/resource/bh8a-8ei6.json",
        "2017": "https://data.nola.gov/resource/afbm-fq4k.json"
      },
      "url": "https://data.nola.gov/browse?tags=electronic+police+report",
      "query": {
        "dateStart": "occurred_date_time between '",
        "timeStart": "T00:00:00' ",
        "dateEnd": "and '",
        "timeEnd": "T23:59:59' ",
        // "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=occurred_date_time DESC"
      }
    }
  ],
  "ny": [
    {
      "city": "new york",
      "apiUrl": {
        "2006thru2015": "https://data.cityofnewyork.us/resource/9s4h-37hy.json",
        "2016": "https://data.cityofnewyork.us/resource/7x9x-zpz6.json"
      },
      "url": "https://nycopendata.socrata.com/browse?Dataset-Information_Agency=Police+Department+%28NYPD%29&limitTo=datasets",
      "query": {
        "dateStart": "cmplnt_fr_dt >=  '",
        "timeStart": "'",
        "dateEnd": "AND cmplnt_fr_dt <= '",
        "timeEnd": "'",
        "radiusStart": "AND within_circle(lat_lon,",
        "dateOrder": "&$order=cmplnt_fr_dt DESC"
      }
    }
  ],
  "wa": [
    {
      "city": "seattle",
      "apiUrl": {
        "Aug2011ToPresent": "https://data.seattle.gov/resource/y7pv-r3kh.json"
      },
      "url": "https://data.seattle.gov/browse?category=Public+Safety&limitTo=datasets&tags=police+report",
      "query": {
        "dateStart": "occurred_date_or_date_range_start between '",
        "timeStart": "T00:00:00' ",
        "dateEnd": "and '",
        "timeEnd": "T23:59:59' ",
        "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=occurred_date_or_date_range_start DESC"
      }
    }
  ]
};
