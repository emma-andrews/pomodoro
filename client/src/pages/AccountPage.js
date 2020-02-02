import React from 'reactn';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

const AccountPage = (props) => {
  return (
    <Row className='justify-content-md-center' style={{ margin: '2rem' }}>
      <Form>
        <Col>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='username' placeholder='Enter new username' />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter new password' />
          </Form.Group>
        </Col>
        <Col>
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Col>
      </Form>
    </Row>
  );
};

export default AccountPage;
