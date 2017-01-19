module.exports = function(app, express) {
  let crimeSearchRouter = express.Router();

  app.use('/api/crimeSearch', crimeSearchRouter);

  require('./crimeSearch/crimeRoutes.js')(crimeSearchRouter);
};
