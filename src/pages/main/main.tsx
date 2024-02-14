import React from "react";
import { ButtonDif } from "../../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonUI } from "../../components/buttons-UI";

const MainContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="title">САПЁР</div>
      <div className="choise-dif">Выберите сложность</div>
      <div className="card">
        <div className="buttons">
          <Link to={`/game/${"easy"}`}>
            <ButtonDif>{"Легкая"}</ButtonDif>
          </Link>
          <Link to={`/game/${"middle"}`}>
            <ButtonDif>{"Средняя"}</ButtonDif>
          </Link>
          <Link to={`/game/${"hard"}`}>
            <ButtonDif>{"Сложная"}</ButtonDif>
          </Link>
        </div>
      </div>
      <Link to={`/leaderboard`} className="button-to-leaderboard">
        <ButtonUI>{"Таблица лидеров"}</ButtonUI>
      </Link>
      <img src={"images/bomb.png"} alt="Bomb" className="bomb1" />
      <img src={"images/bomb.png"} alt="Bomb" className="bomb2" />
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 96px;
    margin-top: 32px;
  }

  .choise-dif {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .card {
    height: 326px;
    padding: 23px 0;
    background-image: repeating-conic-gradient(#a0a0a0 0% 25%, #ffffff 0% 50%);
    background-position: 0 0, 10px 10px;
    background-size: 8px 8px;
    background-color: #ffffff;
  }

  .buttons {
    display: flex;
    height: 100%;
    width: 374px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    background-color: white;
  }

  .button-to-leaderboard {
    margin-top: 16px;
  }

  .bomb1 {
    z-index: -1;
    position: absolute;
    right: calc(100vw - 15%);
    animation: bomb1-float 12s ease-in-out infinite;
  }
  .bomb2 {
    z-index: -1;
    position: absolute;
    left: calc(100vw - 15%);
    animation: bomb2-float 11s ease-in-out infinite;
  }

  @keyframes bomb1-float {
    0% {
      top: 213px;
    }
    50% {
      top: 170px;
    }
    100% {
      top: 213px;
    }
  }
  @keyframes bomb2-float {
    0% {
      bottom: 213px;
    }
    50% {
      bottom: 170px;
    }
    100% {
      bottom: 213px;
    }
  }
`;
