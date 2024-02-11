import React from "react";
import { GameField, Leaderboard, Statistic, Timer } from "./components";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonUI } from "../../components";

const GameContainer = ({ className }) => {
  const { difficulty } = useParams();
  const navigate = useNavigate();

  let dimension, minutes, mines;

  switch (difficulty) {
    case "easy":
      dimension = [8, 8];
      minutes = 10;
      mines = 9;
      break;
    case "middle":
      dimension = [16, 16];
      minutes = 40;
      mines = 40;
      break;
    case "hard":
      dimension = [32, 16];
      minutes = 100;
      mines = 77;
      break;
    default:
      break;
  }

  return (
    <div className={className}>
      <div>Сложность:</div>
      <div> {difficulty}</div>
      <div>
        Время: <Timer minutes={minutes} />
        <ButtonUI onClick={() => navigate(-1)}>Возврат</ButtonUI>
        <ButtonUI onClick={() => window.location.reload()}>Перезапуск</ButtonUI>
      </div>
      <div className="row">
        <Leaderboard />
        <GameField dimension={dimension} mines={mines} />
        <Statistic />
      </div>
    </div>
  );
};

export const Game = styled(GameContainer)`
  .row {
    display: flex;
    justify-content: space-between;
  }
`;
