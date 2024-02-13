import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRecord } from "../../selector/select-record";

interface LeaderboadrProps {
  className?: string;
}

const LeaderboardContainer = (props: LeaderboadrProps) => {
  const leaderboard = useSelector(selectRecord);

  // Функция для фильтрации и сортировки записей по сложности и времени
  const getSortedRecords = (difficulty: string) => {
    return leaderboard
      .filter((record) => record.difficulty === difficulty)
      .sort((a, b) => b.time - a.time)
      .slice(0, 10);
  };

  return (
    <div className={props.className}>
      <div className="title">leaderboard</div>

      <div className="card">
        <div className="title">easy</div>
        {getSortedRecords("easy").map((record, index) => (
          <div className="line" key={index}>
            <span>{record.name}</span>
            <span>-</span>
            <span>{record.time}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="title">middle</div>
        {getSortedRecords("middle").map((record, index) => (
          <div className="line" key={index}>
            <span>{record.name}</span>
            <span>-</span>
            <span>{record.time}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="title">hard</div>
        {getSortedRecords("hard").map((record, index) => (
          <div className="line" key={index}>
            <span>{record.name}</span>
            <span>-</span>
            <span>{record.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Leaderboard = styled(LeaderboardContainer)`
  .card {
    margin-left: 30px;
    width: 200px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .line {
    display: flex;
    justify-content: space-between;
  }
`;
