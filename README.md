# Crime Data

##General Info...

The idea behind this app is to create a place where people can search online records of crime around a particular location. The crime data comes from open data of various municipalities.

This project will use the following stack technologies:
  * React
  * Redux
  * Express

As this is a personal side project for me, updates will come at their own pace.

##Running Crime Data...

After downloading the application, make sure to install the dependencies by running `npm install`.

**Front End Dev Work Only**
If you only need/want to work on the front end aspect of the project, from the terminal all you need to do is enter `npm start` and webpack will take care of the rest. This includes hot reloading so as you make changes without having to constantly refresh your webpage.

**Server Side Work**
If you need/want to work on back end of the project, you'll first need to enter `npm run build`. This will have webpack run the automated production build of the app (including the creation of a /dist file and minifying everything). From there, I recommend the use of nodemon (https://www.npmjs.com/package/nodemon) to launch the server so you can work on both the front and back ends. *Please note: Because you are using the production build to work on the server, you lose the ability to use hot reloading on the front end. If you make any changes on the front end, you WILL need to run `npm run build` again to get the app to read your changes*

***If you are running just the front end, know that you can access the web app on your local host port 3000. If you are running the server, you go to local host port 8000***

##What I've Done So Far...

##Currently Working On...

##Many Thanks To...
  * the SF Crime Data group at **Code for America** (https://github.com/sfbrigade/sf-crime-data). I saw they were building this for San Francisco only and I wanted to expand it's reach and turn it from being a client-side only app to a full stack app. Thanks for the inspiration!
  * Cory House as I used his React Slingshot starter kit (https://github.com/coryhouse/react-slingshot) to help me get started on the front end.
