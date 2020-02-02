import React, { useState, useGlobal } from 'reactn';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Clock.scss';
import { Form, Row, Col, Container } from 'react-bootstrap';

const Clock = (props) => {
  const [id] = useGlobal('currentUserID');
  const [playing, setPlaying] = useState(props.running);
  const [onBreak, setBreak] = useState(false);

  const [alreadyPausedForBreak, setAlreadyPausedForBreak] = useState(false);

  //https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  };

  const pause = async () => {
    setPlaying(!playing);
    if (id !== null) {
      if (!playing) {
        await axios.get('/external/users/play/', { params: { id: id } });
      } else {
        await axios.get('/external/users/pause/', { params: { id: id } });
      }
    }
  };

  const renderTime = (value) => {
    if (value === 0) {
      return <div className='timer'>Time's up!</div>;
    } else if (value === props.break && id !== null) {
      if (!alreadyPausedForBreak)
        axios.get('/external/users/pause/', { params: { id: id } });
      setAlreadyPausedForBreak(true);
    } else if (value !== props.break && id !== null) {
      setAlreadyPausedForBreak(false);
    }
    return (
      <div className='timer'>
        <div className='text'>Remaining</div>
        <div className='value'>{fmtMSS(value)}</div>
        <div className='text'>minutes</div>
      </div>
    );
  };

  return (
    <Row
      className='justify-content-md-center'
      style={{
        margin: '2rem',
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Col>
        <CountdownCircleTimer
          onComplete={() => {
            if (id !== null) {
              axios.get('/external/users/play/', { params: { id: id } });
            }
            return [true, 1500];
          }}
          isPlaying={playing}
          durationSeconds={props.time}
          initialRemainingTime={props.time}
          colors={[['#45cb85']]}
          ariaLabel
          renderTime={renderTime}
        />

        <Button variant='success' onClick={pause} style={{ marginTop: '2rem' }}>
          {playing ? 'Pause' : 'Play'}
        </Button>
      </Col>
    </Row>
  );
};

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  break: PropTypes.number.isRequired,
};

export default Clock;
