import React from "react";
import styled from "styled-components";

interface CellProps {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const CellContainer = (props: CellProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (props.isOpen) return;
    if (event.type === "click") {
      props.onLeftClick();
    } else if (event.type === "contextmenu") {
      props.onRightClick();
    }
  };

  return (
    <div
      className={props.className}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {props.children}
    </div>
  );
};

export const Cell = styled(CellContainer)`
  width: 20px;
  height: 20px;
  border: 2px solid gray;
  background-color: gray;
  ${({ isOpen }) =>
    isOpen ? `background-color: #b8b8b8;` : `background-color: gray;`}
  border-radius: 2px;
  line-height: 20px;
  margin-bottom: 3px;
  margin-left: 3px;
`;
