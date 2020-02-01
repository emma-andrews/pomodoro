import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const SettingsPage = (props) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Pomodoro Interval Length
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">23 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-2">24 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">25 minutes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <br></br>

      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Pomodoro Break Length
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">3 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-2">4 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">5 minutes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <br></br>

      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Pomodoro Session Length
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">1 hour</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2 hours</Dropdown.Item>
          <Dropdown.Item href="#/action-3">4 hours</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SettingsPage;
