import React from "react";
import styled from "styled-components";
import { CellState, useGameField } from "./hooks";
import { Cell } from "./components";

interface GameFieldProps {
  className?: string;
  dimension: [number, number];
  mines: number;
}

const GameFieldContainer = (props: GameFieldProps) => {
  const { field, openCell, cycleMark } = useGameField({
    fieldH: props.dimension[1],
    fieldW: props.dimension[0],
    mines: props.mines,
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
    <div className={props.className}>
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
