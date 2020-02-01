import React from 'react';
import Button from 'react-bootstrap/Button';

const HomePage = (props) => {
  return (
    <>
      <h1>Welcome!</h1>
      <Button href='/internal/spotify_auth'>Start</Button>
    </>
  );
};

export default HomePage;
