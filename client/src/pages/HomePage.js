import React, { useGlobal } from 'reactn';
import Button from 'react-bootstrap/Button';
import Clock from '../components/Clock/Clock';
import { Redirect } from 'react-router-dom';
import paths from '../RouterPaths';
import { Form, Row, Col, Container } from 'react-bootstrap';

const HomePage = (props) => {
  const [currentUser] = useGlobal('currentUser');

  // redirect if not logged in
  return (
    <>
      {/* {!currentUser || currentUser === null ? (
        <Redirect to={paths.welcomePage} />
      ) : null} */}
      <h1 className='welcomeDisplay1'>Welcome!</h1>
      {/* <Button
        href='/internal/spotify_auth'
        style={{ backgroundColor: '#2f6690' }}
      >
        Start
      </Button> */}
      <Clock time={18} break={15}></Clock>
    </>
  );
};

export default HomePage;
