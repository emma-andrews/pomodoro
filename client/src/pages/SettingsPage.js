import React from 'reactn';
import Form from 'react-bootstrap/Form';

const SettingsPage = (props) => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Interval Length</Form.Label>
          <Form.Control
            type='interval'
            placeholder='Enter an interval length in minutes'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Break Length</Form.Label>
          <Form.Control
            type='break'
            placeholder='Enter a break length in minutes'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Session Length</Form.Label>
          <Form.Control
            type='session'
            placeholder='Enter a session length in minutes'
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default SettingsPage;
