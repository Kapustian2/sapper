import React from "react";
import styled from "styled-components";

interface StatisticProps {
  className?: string;
  flags: number;
}

const StatisticContainer = (props: StatisticProps) => {
  return (
    <div className={props.className}>
      <div className="title">statistic</div>
      <div className="mines-count">
        <span>Количество мин</span>
        <span>{props.flags}</span>
      </div>
    </div>
  );
};

export const Statistic = styled(StatisticContainer)`
  margin-right: 30px;
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
