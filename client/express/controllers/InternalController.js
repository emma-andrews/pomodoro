const queryString = require('querystring');
const request = require('request');

// Populate process.env
require('dotenv').config({ path: __dirname + '/../../../.env' });

const stateKey = 'spotify_auth_state';
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:8080/internal/spotify_callback'; // Your redirect uri'

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.spotifyAuth = (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  const scope = 'user-modify-playback-state';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      queryString.stringify({
        response_type: 'code',
        client_id: clientID,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
      })
  );
};

exports.spotifyCallback = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      '/#' +
        queryString.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(clientID + ':' + clientSecret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + accessToken },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
          console.log(accessToken);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          '/#' +
            queryString.stringify({
              access_token: accessToken,
              refresh_token: refreshToken,
            })
        );
      } else {
        res.redirect(
          '/#' +
            queryString.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
};

exports.spotifyRefreshToken = (req, res) => {
  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' + new Buffer(clientID + ':' + clientSecret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;
      res.send({
        access_token: accessToken,
      });
    }
  });
};
