import React from 'reactn';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

const SettingsPage = (props) => {
  return (
    <Row className='justify-content-md-center' style={{ margin: '2rem' }}>
      <Form>
        <Col>
          <Form.Label style={{ marginTop: '2rem', width: '160%' }}>
            Interval Length
          </Form.Label>
          <Form.Control type='interval' placeholder='Enter in minutes' />
        </Col>

        <Col>
          <Form.Label style={{ marginTop: '2rem', width: '160%' }}>
            Break Length
          </Form.Label>
          <Form.Control type='break' placeholder='Enter in minutes' />
        </Col>

        <Col>
          <Form.Label style={{ marginTop: '2rem', width: '160%' }}>
            Session Length
          </Form.Label>
          <Form.Control type='session' placeholder='Enter in minutes' />
        </Col>

        <Col>
          <Button variant='primary' type='submit' style={{ marginTop: '2rem' }}>
            Save
          </Button>
        </Col>
      </Form>
    </Row>
  );
};

export default SettingsPage;
