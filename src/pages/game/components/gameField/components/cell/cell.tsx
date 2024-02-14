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

  let modifiedChildren = props.children;
  if (props.children === 0) {
    modifiedChildren = "";
  }

  return (
    <div
      className={props.className}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      <span className="value">{modifiedChildren}</span>
    </div>
  );
};

export const Cell = styled(CellContainer)`
  width: 20px;
  height: 20px;
  border: 2px gray;
  ${({ isOpen }) =>
    isOpen
      ? `background-color: #CACACA;`
      : `background-color: #666;  
       &:hover {
    background-color: #505050;
  }`}
  border-radius: 2px;
  line-height: 20px;
  margin: 5px 2.5px;

  .value {
    color: ${({ children }) => {
      switch (String(children)) {
        case "1":
          return "#1A75FF";
        case "2":
          return "#008d0e";
        case "3":
          return "#E10000";
        case "4":
          return "#0114C3";
        case "5":
          return "#940000";
        case "6":
          return "#00C4D0";
        case "7":
          return "#000000";
        case "8":
          return "#FFFFFF";
        default:
          return "#000";
      }
    }};
  }
`;
