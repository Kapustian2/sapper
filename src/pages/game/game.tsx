import React from "react";
import { GameField, GameStats, SaveRecordModal } from "./components";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDif } from "../../components";
import { GameProvider } from "./contexts/gameContext/index.tsx";

const GameContainer = ({ className }) => {
  let { difficulty } = useParams();
  if (!difficulty) difficulty = "easy";
  const navigate = useNavigate();

  return (
    <GameProvider gameSettings={{ difficulty }}>
      <div className={className}>
        <div>Сложность:</div>
        <div> {difficulty}</div>
        <div>
          <ButtonDif onClick={() => navigate(-1)}>Возврат</ButtonDif>
          <ButtonDif onClick={() => window.location.reload()}>
            Перезапуск
          </ButtonDif>
        </div>
        <div className="row">
          <GameField />
          <GameStats />
        </div>
        <SaveRecordModal />
      </div>
    </GameProvider>
  );
};

export const Game = styled(GameContainer)`
  .row {
    display: flex;
    justify-content: space-around;
  }
`;
