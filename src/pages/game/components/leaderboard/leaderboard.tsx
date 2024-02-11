import React from "react";
import styled from "styled-components";

interface LeaderboadrProps {
  className?: string;
}

const LeaderboardContainer = (props: LeaderboadrProps) => {
  return (
    <div className={props.className}>
      <div className="title">leaderboard</div>
      <div className="line">
        <span>ИМЯ</span>
        <span>-</span>
        <span>ОЧКИ</span>
      </div>
    </div>
  );
};

export const Leaderboard = styled(LeaderboardContainer)`
  margin-left: 30px;
  width: 200px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .line {
    display: flex;
    justify-content: space-between;
  }
`;
