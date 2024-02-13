import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRecord } from "../../selector/select-record";

interface LeaderboadrProps {
  className?: string;
}

const LeaderboardContainer = (props: LeaderboadrProps) => {
  const leaderboard = useSelector(selectRecord);

  return (
    <div className={props.className}>
      <div className="title">leaderboard</div>
      <div className="card">
        <div className="title">easy</div>
        <div className="line">
          <span>{leaderboard.time}</span>
          <span>-</span>
          <span>ОЧКИ</span>
        </div>
      </div>
      <div className="card">
        <div className="title">middle</div>
        <div className="line">
          <span>ИМЯ</span>
          <span>-</span>
          <span>ОЧКИ</span>
        </div>
      </div>
      <div className="card">
        <div className="title">hard</div>
        <div className="line">
          <span>ИМЯ</span>
          <span>-</span>
          <span>ОЧКИ</span>
        </div>
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
