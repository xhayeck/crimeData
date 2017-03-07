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
      "dataset": {
        '2011': { //apiUrl this belongs to
          'datasetTitle': 'LAPD Crime and Collision Raw Data for 2011',
          'overviewUrl': 'https://data.lacity.org/A-Safe-City/LAPD-Crime-and-Collision-Raw-Data-for-2011/gaq4-bvj5',
          'datasetUrl': 'https://data.lacity.org/A-Safe-City/LAPD-Crime-and-Collision-Raw-Data-for-2011/gaq4-bvj5/data'
        },
        '2012thru2015': { //apiUrl this belongs to
          'datasetTitle': 'Crimes 2012-2015',
          'overviewUrl': 'https://data.lacity.org/A-Safe-City/Crimes-2012-2015/s9rj-h3s6',
          'datasetUrl': 'https://data.lacity.org/A-Safe-City/Crimes-2012-2015/s9rj-h3s6/data'
        },
        '2016': { //apiUrl this belongs to
          'datasetTitle':'LAPD Crime and Collision Raw Data for 2016',
          'overviewUrl': 'https://data.lacity.org/A-Safe-City/LAPD-Crime-and-Collision-Raw-Data-for-2016/ttiz-7an8',
          'datasetUrl': 'https://data.lacity.org/A-Safe-City/LAPD-Crime-and-Collision-Raw-Data-for-2016/ttiz-7an8/data'
        }
      },
      "query": {
        "dateStart": "date_occ >= '",
        "timeStart": "'",
        "dateEnd": "AND date_occ <= '",
        "timeEnd": "'",
        "radiusStart": "AND within_circle(location_1,",
        "dateOrder": "&$order=date_occ DESC"
      },
      'headers': { //To make the column names more user friendly
        'address': 'Address', //2011
        'area': 'Area', //2011, 2012thru2015, 2016
        'area_name': 'Area Name', //2011, 2012thru2015, 2016
        'crm_cd': 'Crime Code', //2011, 2012thru2015, 2016
        'crm_cd_desc': 'Description', //2011, 2016
        'crmcd_desc': 'Description', //2012thru2015
        'cross_street': 'Cross Street', //2011, 2012thru2015, 2016
        'date_occ': 'Date', //2011, 2012thru2015, 2016
        'date_rptd': 'Date Reported', //2011, 2012thru2015, 2016
        'dr_no': '', //2011, 2012thru2015, 2016
        'location': 'Location', //2011, 2012thru2015, 2016 (2016: same as seattle; 2011: string in parenthesis has coordinates)
        'location_1': 'Location', //2012thru2015, 2016 (2012thru2015: string in parenthesis has coordinates)
        'rd': '', //2011, 2012thru2015, 2016
        'status': 'Status', //2011, 2012thru2015, 2016
        'status_desc': 'Status Description', //2011, 2012thru2015
        'time_occ': 'Time Occured' //2011, 2012thru2015, 2016
      },
      'cityLoc': {
        "lat" : 34.0522342,
        "lng" : -118.2436849
      }
    },
    {
      "city": "san francisco",
      "apiUrl": {
        "2003ToPresent": "https://data.sfgov.org/resource/cuks-n6tp.json"
      },
      "dataset": {
        '2003ToPresent': { //apiUrl this belongs to
          'datasetTitle': 'SFPD Incidents - from 1 January 2003',
          'overviewUrl': 'https://data.sfgov.org/browse?category=Public+Safety&limitTo=datasets&tags=crime',
          'datasetUrl': 'https://data.sfgov.org/Public-Safety/SFPD-Incidents-from-1-January-2003/tmnf-yvry'
        }
      },
      "query": {
        "dateStart": "date >= '",
        "timeStart": "'",
        "dateEnd": "AND date <= '",
        "timeEnd": "'",
        "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=date DESC"
      },
      'headers': { //To make the column names more user friendly
        'address': 'Address', //2003ToPresent
        'category': 'Category', //2003ToPresent
        'date': 'Date', //2003ToPresent
        'dayofweek': 'Day of the Week', //2003ToPresent
        'descript': 'Description', //2003ToPresent
        'incidntnum': 'Incident Number', //2003ToPresent
        'location': 'Location', //2003ToPresent (same as seattle)
        'pddistrict': 'District', //2003ToPresent
        'pdid': 'District Id', //2003ToPresent
        'resolution': 'Resolution', //2003ToPresent
        'time': 'Time', //2003ToPresent
        'x': 'X-Coordinate', //2003ToPresent
        'y': 'Y-Coordinate' //2003ToPresent
      },
      'cityLoc': {
        "lat" : 37.7749295,
        "lng" : -122.4194155
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
      "url": {
        '2001ToPresent': { //apiUrl this belongs to
          'datasetTitle': 'Crimes - 2001 to present',
          'overviewUrl': 'https://data.cityofchicago.org/browse?category=Public+Safety&limitTo=datasets',
          'datasetUrl': 'https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2'
        },
        'oneYearPriorToPresent': { //apiUrl this belongs to
          'datasetTitle': 'Crimes - One year prior to present',
          'overviewUrl': 'https://data.cityofchicago.org/browse?category=Public+Safety&limitTo=datasets',
          'datasetUrl': 'https://data.cityofchicago.org/Public-Safety/Crimes-One-year-prior-to-present/x2n5-8w5q'
        }
      },
      "query": {
        "dateStart": "date_of_occurrence between '",
        "timeStart": "T00:00:00' ",
        "dateEnd": "and '",
        "timeEnd": "T23:59:59' ",
        "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=date_of_occurrence DESC"
      },
      'headers': { //To make the column names more user friendly
        'id': 'Id', //2001
        'case_': 'Case', //1Year
        'case_number': 'Case Number', //2001
        'date': 'Date', //2001
        'date_of_occurrence': 'Date', //1Year
        'block': 'Address', //2001, 1Year
        'iucr': '', //2001
        '_iucr': '', //1Year
        '_primary_decsription': 'Description', //1Year
        '_secondary_description': 'Secondary Description', //1Year
        'primary_type': 'Primary Type', //2001
        'description': 'Description', //2001
        'location_description': 'Location Description', //2001
        '_location_description': 'Location Description', //1Year
        'arrest': 'Arrest Made', //2001, 1Year
        'domestic': 'Domestic', //2001, 1Year
        'beat': 'Beat', //2001
        'district': 'District', //2001
        'ward': 'Ward', //2001
        'community_area': 'Community Area', //2001
        'fbi_code': 'FBI Code', //2001
        'fbi_cd': 'FBI Code', //1Year
        'x_coordinate': 'X-Coordinate', //2001, 1Year
        'y_coordinate': 'Y-Coordinate', //2001, 1Year
        'year': 'Year', //2001
        'updated_on': 'Updated On', //2001
        'latitude': 'Latitude', //2001, 1Year
        'longitude': 'longitude', //2001, 1Year
        'location': 'Location' //2001, 1Year (same as seattle)
      },
      'cityLoc': {
        "lat" : 41.8781136,
        "lng" : -87.6297982
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
      "dataset": {
        '2010': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2010',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2010/s25y-s63t',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2010/s25y-s63t/data'
        },
        '2011': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2011',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2011/t596-ginn',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2011/t596-ginn/data'
        },
        '2012': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2012',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2012/x7yt-gfg9',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2012/x7yt-gfg9/data'
        },
        '2013': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2013',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2013/je4t-6qub',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2013/je4t-6qub/data'
        },
        '2014': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2014',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2014/6mst-xjhm',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2014/6mst-xjhm/data'
        },
        '2015': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2015',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2015/9ctg-u58a',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2015/9ctg-u58a/data'
        },
        '2016': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2016',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2016/4gc2-25he',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2016/4gc2-25he/data'
        },
        '2017': { //apiUrl this belongs to
          'datasetTitle': 'Electronic Police Report 2017',
          'overviewUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2017/qtcu-97s9',
          'datasetUrl': 'https://data.nola.gov/Public-Safety-and-Preparedness/Electronic-Police-Report-2017/qtcu-97s9/data'
        }
      },
      "query": {
        "dateStart": "occurred_date_time between '",
        "timeStart": "T00:00:00' ",
        "dateEnd": "and '",
        "timeEnd": "T23:59:59' ",
        "radiusStart": "AND within_circle(location,",
        "dateOrder": "&$order=occurred_date_time DESC"
      },
      'headers': { //To make the column names more user friendly
        'item_number': 'Item Number', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'district': 'District', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'location': 'Address', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'disposition': 'Disposition', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'signal_type': 'Crime Type', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'signal_description': 'Description', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'occurred_date_time': 'Date', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'charge_code': 'Charge Code', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'charge_description': 'Charge Description', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'offender_race': 'Offender Race', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'offender_gender': 'Offender Gender', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'offender_age': 'Offender Age', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'victim_race': 'Victim Race', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'victim_gender': 'Victim Gender', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'victim_age': 'Victim Age', //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        'report_type': 'Report Type' //2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
      },
      'cityLoc': {
        "lat" : 29.95106579999999,
        "lng" : -90.0715323
      },
    }
  ],
  "ny": [
    {
      "city": "new york",
      "apiUrl": {
        "2006thru2015": "https://data.cityofnewyork.us/resource/9s4h-37hy.json",
        "2016": "https://data.cityofnewyork.us/resource/7x9x-zpz6.json"
      },
      "dataset": {
        '2006thru2015': { //apiUrl this belongs to
          'datasetTitle': 'NYPD Complaint Data Historic',
          'overviewUrl': 'https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i',
          'datasetUrl': 'https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i/data'
        },
        '2016': { //apiUrl this belongs to
          'datasetTitle': 'NYPD Complaint Data Current YTD',
          'overviewUrl': 'https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-YTD/5uac-w243',
          'datasetUrl': 'https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-YTD/5uac-w243/data'
        },
      },
      "query": {
        "dateStart": "cmplnt_fr_dt >=  '",
        "timeStart": "'",
        "dateEnd": "AND cmplnt_fr_dt <= '",
        "timeEnd": "'",
        "radiusStart": "AND within_circle(lat_lon,",
        "dateOrder": "&$order=cmplnt_fr_dt DESC"
      },
      'headers': { //To make the column names more user friendly
        'cmplnt_num': 'Complaint Number', //2006thru2015, 2016
        'cmplnt_fr_dt': 'Date', //2006thru2015, 2016
        'cmplnt_fr_tm': 'Complaint Time', //2006thru2015, 2016
        'cmplnt_to_dt': '', //2006thru2015, 2016
        'cmplnt_to_tm': '', //2006thru2015, 2016
        'rpt_dt': 'Report Date', //2006thru2015, 2016
        'ky_cd': '', //2006thru2015, 2016
        'ofns_desc': 'Description', //2006thru2015, 2016
        'pd_cd': 'PD Code', //2006thru2015, 2016
        'pd_desc': 'PD Description', //2006thru2015, 2016
        'crm_atpt_cptd_cd': 'Crime Attempted/Completed', //2006thru2015, 2016
        'law_cat_cd': 'Category', //2006thru2015, 2016
        'juris_desc': 'Jurisdiction', //2006thru2015, 2016
        'boro_nm': 'Borough Name', //2006thru2015, 2016
        'addr_pct_cd': '', //2006thru2015, 2016
        'loc_of_occur_desc': 'Location of Occurrence Description', //2006thru2015, 2016
        'prem_typ_desc': 'Location Description', //2006thru2015, 2016
        'parks_nm': 'Park Name', //2006thru2015, 2016
        'hadevelopt': '', //2006thru2015, 2016
        'x_coord_cd': 'X-Coordinate', //2006thru2015, 2016
        'y_coord_cd': 'Y-Coordinate', //2006thru2015, 2016
        'latitude': 'Latitude', //2006thru2015, 2016
        'longitude': 'longitude', //2006thru2015, 2016
        'lat_lon': 'Location', //2006thru2015, 2016 (same as seattle)
      },
      'cityLoc': {
        "lat" : 40.7127837,
        "lng" : -74.0059413
      }
    }
  ],
  "wa": [
    {
      "city": "seattle",
      "apiUrl": {
        "Oct2010ToPresent": "https://data.seattle.gov/resource/pu5n-trf4.json"
      },
      "dataset": {
        'Oct2010ToPresent': { //apiUrl this belongs to
          'datasetTitle': 'Seattle Police Department 911 Incident Response',
          'overviewUrl': 'https://data.seattle.gov/Public-Safety/Seattle-Police-Department-911-Incident-Response/3k2p-39jp',
          'datasetUrl': 'https://data.seattle.gov/Public-Safety/Seattle-Police-Department-911-Incident-Response/3k2p-39jp/data'
        }
      },
      "query": {
        "dateStart": "event_clearance_date between '",
        "timeStart": "T00:00:00' ",
        "dateEnd": "and '",
        "timeEnd": "T23:59:59' ",
        "radiusStart": "AND within_circle(incident_location,",
        "dateOrder": "&$order=event_clearance_date DESC"
      },
      'headers': { //To make the column names more user friendly
        'cad_cdw_id': '', //Oct2010ToPresent
        'cad_event_number': '', //Oct2010ToPresent
        'general_offense_number': 'General Offense Number', //Oct2010ToPresent
        'event_clearance_code': 'Crime Clearance Code', //Oct2010ToPresent
        'event_clearance_description': 'Crime Clearance Description', //Oct2010ToPresent
        'event_clearance_subgroup': 'Crime_Clearance_Subgroup', //Oct2010ToPresent
        'event_clearance_group': 'Crime Clearance Group', //Oct2010ToPresent
        'event_clearance_date': 'Date', //Oct2010ToPresent
        'hundred_block_location': 'Address', //Oct2010ToPresent
        'district_sector': 'District Sector', //Oct2010ToPresent
        'zone_beat': 'Zone', //Oct2010ToPresent
        'census_tract': '', //Oct2010ToPresent
        'longitude': 'longitude', //Oct2010ToPresent
        'latitude': 'latitude', //Oct2010ToPresent
        'incident_location': 'Location', //Oct2010ToPresent (object, first key, array)
        'initial_type_description': 'Description', //Oct2010ToPresent
        'initial_type_subgroup': 'Crime_Subgroup', //Oct2010ToPresent
        'initial_type_group': 'Crime Group', //Oct2010ToPresent
        'at_scene_time': 'Arrived At Scene' //Oct2010ToPresent
      },
      'cityLoc': {
        "lat" : 47.6062095,
        "lng" : -122.3320708
      }
    }
  ]
};
