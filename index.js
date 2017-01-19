/*eslint-disable no-console*/
//Node configuration
// require('babel-polyfill');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/dist')); //requiring use of folder for desktop web browser client

require('./server/middleware.js')(app, express);

let port = process.env.PORT || 8000; //set port to use

app.listen(port, function() {
  console.log('Now running Crime Data app on port ', port, '!');
});
