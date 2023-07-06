import React, { useState, useEffect } from 'react';
const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setRunning(false);
          document.body.style.backgroundColor = 'red';
          
          // const audio = new Audio('novogodnee-pozdravlenie.mp3');
          //   audio.play();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, minutes, seconds]);

  const startTimer = () => {
    setRunning(true);
    document.getElementById('minutes').disabled = true;
    document.getElementById('seconds').disabled = true;
  };

  const stopTimer = () => {
    setRunning(false);
    document.getElementById('minutes').disabled = false;
    document.getElementById('seconds').disabled = false;
  };

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setRunning(false);
    document.body.style.backgroundColor = 'white';

    // const audio = new Audio('novogodnee-pozdravlenie.mp3');
    // audio.pause();
    // audio.currentTime = 0;
    
    document.getElementById('minutes').disabled = false;
    document.getElementById('seconds').disabled = false;
  };

  const handleMinutesChange = (e) => {
    if (!running) {
      setMinutes(Number(e.target.value));
    }
  };

  const handleSecondsChange = (e) => {
    if (!running) {
      setSeconds(Number(e.target.value));
    }
  };

  useEffect(() => {
    const storedMinutes = localStorage.getItem('minutes');
    const storedSeconds = localStorage.getItem('seconds');

    if (storedMinutes && storedSeconds) {
      setMinutes(Number(storedMinutes));
      setSeconds(Number(storedSeconds));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('minutes', minutes.toString());
    localStorage.setItem('seconds', seconds.toString());
  }, [minutes, seconds]);

  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div>
      <div>
        <input id="minutes" type="number" min="0" max="99" value={minutes} onChange={handleMinutesChange} disabled={running} />
        <span>:</span>
        <input id="seconds" type="number" min="0" max="59" value={seconds} onChange={handleSecondsChange} disabled={running} />
      </div>
      <div>
        <button onClick={startTimer} disabled={running || (minutes === 0 && seconds === 0)}>Start</button>
        <button onClick={stopTimer} disabled={!running}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;