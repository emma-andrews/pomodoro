import React, { useState } from 'reactn';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ModalRegister = (props) => {
  const [show, setShow] = useState(false);

  const closeModalRegister = () => setShow(false);
  const showModalRegister = () => setShow(true);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const postContent = {
      email: email,
      username: username,
      password: password,
    };

    console.log(postContent);

    const postURL = '/external/users';
    try {
      const res = await axios.post(postURL, postContent);
      cookies.set('auth_cookie', `${email}:${password}`);
      closeModalRegister();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant='info' onClick={showModalRegister}>
        Register
      </Button>
      <Modal show={show} onHide={closeModalRegister} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Create a username and password.</p>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmailChange}
                type='email'
                placeholder='Enter a valid email'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={handleUsernameChange}
                type='username'
                placeholder='Enter username'
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

export default ModalRegister;
