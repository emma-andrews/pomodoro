import React, { useState } from 'reactn';
import { Button, Form, Modal } from 'react-bootstrap/';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ModalLogin = (props) => {
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

    const postContent = {
      email: email,
      password: password,
    };

    const postURL = '/external/login';
    try {
      const res = await axios.post(postURL, postContent);
      cookies.set('auth_cookie', `${email}:${password}`);
      closeModelRegister();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant='info' onClick={showModalLogin}>
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

export default ModalLogin;
