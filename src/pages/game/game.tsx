import React from "react";
import { GameField, GameStats, SaveRecordModal } from "./components";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDif } from "../../components";
import { GameProvider } from "./contexts/gameContext/index.tsx";
import arrow from "../../assets/images/back-arrow.png";
import { ButtonUI } from "../../components/buttons-UI/button-ui.tsx";

const GameContainer = ({ className }) => {
  let { difficulty } = useParams();
  if (!difficulty) difficulty = "easy";
  const navigate = useNavigate();

  let dif;
  if (difficulty === "easy") {
    dif = "Легкая";
  } else if (difficulty === "middle") {
    dif = "Средняя";
  } else {
    dif = "Сложная";
  }

  return (
    <GameProvider gameSettings={{ difficulty }}>
      <div className={className}>
        <div className="dif">
          <span className="disc">Сложность:</span>
          <span className="difficult"> {dif}</span>
        </div>
        <div className="navigate">
          <img
            src={arrow}
            alt="back-arrow"
            onClick={() => navigate(-1)}
            className="image"
          />
          <ButtonUI onClick={() => window.location.reload()}>
            Перезапуск
          </ButtonUI>
        </div>
        <div className="row">
          <GameField className="gameField" />
          <GameStats />
        </div>
        <SaveRecordModal />
      </div>
    </GameProvider>
  );
};

export const Game = styled(GameContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .dif {
    margin-top: 12px;
    font-size: 40px;
  }

  .navigate {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    width: 234px;
  }

  .statistic {
    right: 200px;
  }

  .row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1024px;
    .gameField {
      flex: 1 1 0%;
    }
  }

  .image {
    &:hover {
      cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    }
  }
`;
