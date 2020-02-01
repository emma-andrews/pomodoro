import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap/';

const ModalRegister = (props) => {
    const [show, setShow] = useState(false);

    const closeModalRegister = () => setShow(false);
    const showModalRegister = () => setShow(true);
    const submitForm = () => {
      //if success, hide modal
      closeModelRegister();
    };
    
    return (
      <>
        <Button variant="info" onClick={showModalRegister}>Register</Button>
        <Modal show={show} onHide={closeModalRegister} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <p>Create a username and password.</p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter a valid email" />
              </Form.Group>
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

export default ModalRegister;