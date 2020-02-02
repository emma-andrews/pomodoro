import React, { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import queryString from 'querystring';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import paths from '../RouterPaths';

const SpotifyAuthFlow = (props) => {
  const [currentUserID] = useGlobal('currentUserID');

  const updateUserURL = '/external/users/updatespotify/';
  const values = queryString.parse(props.location.search);
  console.log(values);

  const requestArgs = {
    method: 'PUT',
    url: updateUserURL,
    data: {
      Accesstoken: values['?access_token'],
      Refreshtoken: values['refresh_token'],
    },
    params: { id: currentUserID },
  };

  if (currentUserID && currentUserID !== null) {
    axios(requestArgs);
    return <Redirect to={paths.homePage} />;
  }
  return null;
};

SpotifyAuthFlow.propTypes = { location: PropTypes.object.isRequired };

export default SpotifyAuthFlow;
