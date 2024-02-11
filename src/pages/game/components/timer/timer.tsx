import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TimerProps {
  className?: string;
  minutes: number;
}

const TimerContainer = (props: TimerProps) => {
  const totalSeconds = props.minutes * 60;
  const [time, setTime] = useState(totalSeconds);
  const [timeIsEnd, setTimeIsEnd] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      setTimeIsEnd(true);
    }
  }, [time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={props.className}>
      {timeIsEnd ? "Время вышло" : formatTime(time)}
    </div>
  );
};

export const Timer = styled(TimerContainer)``;
