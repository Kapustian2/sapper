import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRecord } from "../../selector/select-record";
import arrow from "../../assets/images/back-arrow.png";
import { useNavigate } from "react-router-dom";

interface LeaderboadrProps {
  className?: string;
}

const LeaderboardContainer = (props: LeaderboadrProps) => {
  const leaderboard = useSelector(selectRecord);
  const navigate = useNavigate();

  // Функция для фильтрации и сортировки записей по сложности и времени
  const getSortedRecords = (difficulty: string) => {
    return leaderboard
      .filter((record) => record.difficulty === difficulty)
      .sort((a, b) => b.time - a.time)
      .slice(0, 10);
  };

  return (
    <div className={props.className}>
      <img
        src={arrow}
        alt="back-arrow"
        onClick={() => navigate(-1)}
        className="image"
      />
      <div className="title">Таблица лидеров</div>
      <div className="leaderboards">
        <div className="card">
          <div className="card-header">Легкая сложность</div>
          <div className="card-content">
            <ol>
              {getSortedRecords("easy").map((record, index) => (
                <li>
                  <span className="row" key={index}>
                    <span>{record.name}</span>
                    <span className="dots"></span>
                    <span>{record.time}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Средняя сложность</div>
          <div className="card-content">
            <ol>
              {getSortedRecords("middle").map((record, index) => (
                <li>
                  <span className="row" key={index}>
                    <span>{record.name}</span>
                    <span className="dots"></span>
                    <span>{record.time}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Сложная сложность</div>
          <div className="card-content">
            <ol>
              {getSortedRecords("hard").map((record, index) => (
                <li>
                  <span className="row" key={index}>
                    <span>{record.name}</span>
                    <span className="dots"></span>
                    <span>{record.time}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Leaderboard = styled(LeaderboardContainer)`
  .leaderboards {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 18px;
    gap: 32px;
  }

  .row {
    display: flex;
    width: 100%;
  }

  .dots {
    width: 100%;
    background: radial-gradient(circle at 50% 0.8em, #999 8%, transparent 8%);
    background-size: 0.5em;
    background-repeat: repeat-x;
  }

  .card {
    width: 373px;
    border: 2px solid black;
    .card-header {
      width: 100%;
      background: #d4d4d4;
      font-size: 32px;
      justify-content: center;
      align-items: center;
    }
    .card-content {
      width: 100%;
      font-size: 20px;
      background: white;
    }

    .card-content span {
      text-align: left;
      padding: 0 5px 0 5px;
    }
  }

  .title {
    font-size: 40px;
  }

  .image {
    position: absolute;
    right: calc(100vw - 33%);
  }
  ol {
    margin: 0;
    padding: 0 30px;
  }
`;
