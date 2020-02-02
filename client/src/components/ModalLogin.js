import React, { useState, useGlobal } from 'reactn';
import { Button, Form, Modal } from 'react-bootstrap/';
import axios from 'axios';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

const ModalLogin = (props) => {
  const [currentUser, setCurrentUser] = useGlobal('currentUser');
  const [currentUserID, setCurrentUserID] = useGlobal('currentUserID');

  const [show, setShow] = useState(false);

  const closeModalLogin = () => setShow(false);
  const showModalLogin = () => setShow(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const loginContent = {
      email: email,
      password: password,
    };

    const loginURL = '/external/users/verify';
    try {
      const authRes = await axios.get(loginURL, {
        params: loginContent,
      });
      if (authRes.data && authRes.data.id !== null) {
        const getUserURL = '/external/users';
        const userData = await axios.get(getUserURL, {
          params: { id: authRes.data.id },
        });
        console.log(userData);
        if (userData && userData.data !== null) {
          cookies.set('authCookie', `${email}:${password}`, { path: '/' });
          setCurrentUser(userData.data);
          setCurrentUserID(authRes.data.id);
        }
      }
      closeModalLogin();
      window.location.href = '/internal/spotify_auth';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant='info' onClick={showModalLogin} style={props.style}>
        Login
      </Button>
      <Modal show={show} onHide={closeModalLogin} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Enter username and password to login.</p>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmailChange}
                type='email'
                placeholder='Enter email'
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePasswordChange}
                type='password'
                placeholder='Enter password'
              />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={submitForm}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ModalLogin.propTypes = { style: PropTypes.object };

export default ModalLogin;
