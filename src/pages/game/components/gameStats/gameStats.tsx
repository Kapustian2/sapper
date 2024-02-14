import React, { useState } from "react";
import styled from "styled-components";
import { useGame } from "../../contexts/gameContext/index.tsx";
import { Timer } from "../timer/timer.tsx";
import { useDispatch } from "react-redux";

interface GameStatsProps {
  className?: string;
}

const GameStatsContainer = (props: GameStatsProps) => {
  const game = useGame();
  if (!game) {
    throw new Error("GameContext недоступен");
  }

  let statusGame;
  if (game.state.gameStatus === "playing") {
    statusGame = "Игра идёт";
  } else if (game.state.gameStatus === "idle") {
    statusGame = "Игра ожидает начала";
  } else {
    statusGame = "Игра закончилась";
  }
  return (
    <div className={props.className}>
      <div className="card">
        <div className="title">Статистика</div>
        <div className="row">
          <span>Осталось флагов : </span>
          <span>{game.state.gameField.flags}</span>
        </div>
        <div className="row">
          <span>{statusGame}</span>
        </div>
        <div className="row">
          <span>Осталось времени :</span>
          <Timer />
        </div>
      </div>
    </div>
  );
};

export const GameStats = styled(GameStatsContainer)`
  position: absolute;
  width: 373px;
  height: 520px;
  padding: 23px 0;
  background-image: repeating-conic-gradient(#a0a0a0 0% 25%, #ffffff 0% 50%);
  background-position: 0 0, 10px 10px;
  background-size: 8px 8px;
  background-color: #ffffff;

  font-size: 18px;

  .card {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background-color: white;
  }

  .title {
    font-size: 36px;
  }

  .row {
    display: flex;
    justify-content: space-around;
  }
`;
