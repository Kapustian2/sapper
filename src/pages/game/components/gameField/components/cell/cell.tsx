import React from "react";
import styled from "styled-components";

interface CellProps {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
}

const CellContainer = (props: CellProps) => {
  const handleRightClick = (event) => {
    event.preventDefault();
    console.log("123");
  };

  return (
    <div className={props.className} onContextMenu={handleRightClick}></div>
  );
};

export const Cell = styled(CellContainer)`
  width: 20px;
  height: 20px;
  border: 2px solid gray;
  background-color: gray;
  ${({ isOpen }) =>
    isOpen ? `background-color: #b8b8b8` : "background-color: gray"}
  border-radius: 2px;
  line-height: 20px;
  margin-bottom: 3px;
  margin-left: 3px;
`;