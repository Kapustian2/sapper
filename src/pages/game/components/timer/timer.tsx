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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <div className={props.className}>{formatTime(game.state.timer)}</div>;
};

export const Timer = styled(TimerContainer)``;
