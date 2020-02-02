import React, { useState } from 'reactn';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './Clock.scss';

const Clock = (props) => {
  const [playing, setPlaying] = useState(props.running);
  const [onBreak, setBreak] = useState(false);

  //https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  };

  const renderTime = (value) => {
    if (value === 0) {
      return <div className='timer'>Time's up!</div>;
    } else if (value === props.break) {
      pause();
    }

    return (
      <div className='timer'>
        <div className='text'>Remaining</div>
        <div className='value'>{fmtMSS(value)}</div>
        <div className='text'>minutes</div>
      </div>
    );
  };

  const pause = () => {
    setPlaying(!playing);
  };

  return (
    <>
      <CountdownCircleTimer
        onComplete={() => {
          return [true, 1500];
        }}
        isPlaying={playing}
        durationSeconds={props.time}
        initialRemainingTime={props.time}
        colors={[['#45cb85']]}
        ariaLabel
        renderTime={renderTime}
      />

      <Button variant='success' onClick={pause}>
        {playing ? 'Pause' : 'Play'}
      </Button>
    </>
  );
};

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  break: PropTypes.number.isRequired,
};

export default Clock;
