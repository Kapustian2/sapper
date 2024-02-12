import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGame } from "../../contexts/gameContext/index.tsx";

interface TimerProps {
  className?: string;
}

const TimerContainer = (props: TimerProps) => {
  const game = useGame();
  if (!game) {
    throw new Error("GameContext недоступен");
  }

  const totalSeconds = game.state.timer * 60;
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
