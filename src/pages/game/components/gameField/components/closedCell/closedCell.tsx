import React from "react";
import styled from "styled-components";

const ClosedCellContainer = ({ className }) => {
  const handleRightClick = (event) => {
    event.preventDefault();
    console.log("123");
  };

  return <div className={className} onContextMenu={handleRightClick}></div>;
};

export const ClosedCell = styled(ClosedCellContainer)`
  width: 20px;
  height: 20px;
  border: 2px solid gray;
  background-color: gray;
  border-radius: 2px;
  line-height: 20px;
  margin-bottom: 3px;
  margin-left: 3px;
`;
