import React, { useState } from 'reactn';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ModalLogin from '../components/ModalLogin';
import ModalRegister from '../components/ModalRegister';
import { Row, Col, Container } from 'react-bootstrap';

const WelcomePage = (props) => {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  return (
    <Row
      className='justify-content-md-center'
      style={{ margin: '2px', textAlign: 'center' }}
    >
      <Col>
        <h1 className='welcomeDisplay1'>Welcome!</h1>
        <h3 className='aboutInfoDisplay' style={{ fontFamily: 'Roboto Mono' }}>
          Spotify Linked Pomodoro Timer
        </h3>
        <ModalLogin
          style={{ marginRight: '1rem', marginTop: '2rem' }}
        ></ModalLogin>
        <ModalRegister style={{ marginTop: '2rem' }}></ModalRegister>
      </Col>
    </Row>
  );
};

export default WelcomePage;
