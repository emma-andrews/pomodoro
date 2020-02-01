const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const internalRouter = require('../routes/InternalRouter');
const externalRouter = require('../routes/ExternalRouter');

const developmentMode = 'development';
const devServerEnabled =
  process.argv.length >= 2 && process.argv[2] === developmentMode;

// Populate process.env
require('dotenv').config({ path: __dirname + '/../../../.env' });

const port = process.env.PORT ? process.env.PORT : 8080;

module.exports.start = () => {
  const app = express();

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // Parse application/json
  app.use(bodyParser.json());

  app.use(cors());

  // Routes
  app.use('/internal', internalRouter);
  app.use('/external', externalRouter);

  // Register all routes before registering webpack middleware

  if (devServerEnabled) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevConfig = require('../../webpack.dev');

    const history = require('connect-history-api-fallback');
    const morgan = require('morgan');

    // Handles any requests that don't match the ones above
    app.use(history());

    // Enable request logging for development debugging
    app.use(morgan('dev'));

    const compiler = webpack(webpackDevConfig);
    // Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler));
    // Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
  }

  // For hosting build files, for production
  if (!devServerEnabled) {
    const webpackBuildDir = path.join(__dirname, '../../dist');
    app.use(express.static(webpackBuildDir));

    const htmlEntrypoint = path.join(webpackBuildDir, 'index.html');

    // Handles any requests that don't match the ones above
    app.get('/*', (req, res) => {
      res.sendFile(htmlEntrypoint);
    });
  }

  app.listen(port, () => {
    console.log('App listening on:\n ' + `http://localhost:${port}`);
  });

  return app;
};
