import React from "react";
import styled from "styled-components";

const StatisticContainer = ({ className }) => {
  return <div className={className}>statistic</div>;
};

export const Statistic = styled(StatisticContainer)`
  margin-right: 30px;
  width: 200px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
`;
