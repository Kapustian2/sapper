import React from "react";
import styled from "styled-components";
import { useGame } from "../../contexts/gameContext/index.tsx";
import { Timer } from "../timer/timer.tsx";

interface GameStatsProps {
  className?: string;
}

const GameStatsContainer = (props: GameStatsProps) => {
  const game = useGame();
  if (!game) {
    throw new Error("GameContext недоступен");
  }
  return (
    <div className={props.className}>
      <div className="title">statistic</div>
      <div className="mines-count">
        <span>Количество флагов</span>
        <span>{game.state.gameField.minesCount}</span>
      </div>
      <span>{game.state.gameStatus}</span>
      <Timer />
    </div>
  );
};

export const GameStats = styled(GameStatsContainer)`
  width: 200px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .mines-count {
    display: flex;
    justify-content: space-around;
  }
`;
