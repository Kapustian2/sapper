import React from "react";
import styled from "styled-components";

const CellContainer = ({ className }) => {
  return <div className={className}>1</div>;
};

export const Cell = styled(CellContainer)`
  width: 20px;
  height: 20px;
  border: 2px solid black;
  border-radius: 2px;
  line-height: 20px;
`;
