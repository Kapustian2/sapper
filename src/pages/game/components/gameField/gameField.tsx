import React from "react";
import styled from "styled-components";
import { CellState, useGameField } from "./hooks";
import { Cell } from "./components";

const GameFieldContainer = ({ className, dimension, mines }) => {
  const { field, openCell, cycleMark } = useGameField({
    fieldH: dimension[1],
    fieldW: dimension[0],
    mines,
  });

  function cellContent(cell: CellState) {
    if (cell.isOpen) {
      if (cell.isMined) {
        return "💣";
      } else return cell.minesAround;
    } else {
      if (cell.mark === "flag") return "🚩";
      else if (cell.mark === "question") return "❓";
    }
  }

  return (
    <div className={className}>
      {field.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          {column.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              onLeftClick={() => openCell([columnIndex, cellIndex])}
              onRightClick={() => cycleMark([columnIndex, cellIndex])}
              isOpen={cell.isOpen}
            >
              {cellContent(cell)}
            </Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

export const GameField = styled(GameFieldContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
