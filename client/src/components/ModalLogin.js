import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap/';

const ModalLogin = (props) => {
    const [show, setShow] = useState(false);

    const closeModalLogin = () => setShow(false);
    const showModalLogin = () => setShow(true);
    const submitForm = () => {
      //if success, hide modal
      closeModelLogin();
    };
    
    return (
      <>
        <Button variant="info" onClick={showModalLogin}>Login</Button>
        <Modal show={show} onHide={closeModalLogin} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <p>Enter username and password to login.</p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={submitForm}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
    
        </Modal>
        </>
    );
};

export default ModalLogin;