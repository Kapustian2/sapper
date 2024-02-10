import React from "react";
import { GameField, Timer } from "./components";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonUI } from "../../components";

const GameContainer = ({ className }) => {
  const { difficulty } = useParams();
  const navigate = useNavigate();

  let count, minutes;

  switch (difficulty) {
    case "easy":
      count = [8, 8];
      minutes = 10;
      break;
    case "middle":
      count = [16, 16];
      minutes = 40;
      break;
    case "hard":
      count = [32, 16];
      minutes = 100;
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
      <GameField count={count} />
    </div>
  );
};

const StyledGame = styled(GameContainer)`
  /* Ваши стили */
`;

export const Game = () => <StyledGame />;
