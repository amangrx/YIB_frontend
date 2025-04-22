import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    onTimeUpdate(seconds);
  }, [seconds, onTimeUpdate]);
  
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  
  return (
    <div className="timer">
      <strong>Time: {formatTime(seconds)}</strong>
    </div>
  );
};

export default Timer;