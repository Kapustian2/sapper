import React from "react";
import styled from "styled-components";
import { useGameField } from "./hooks";
import { Cell } from "./components";

const GameFieldContainer = ({ className, dimension, mines }) => {
  const { field, openCell } = useGameField({
    fieldH: dimension[1],
    fieldW: dimension[0],
    mines,
  });

  return (
    <div className={className}>
      {field.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          {column.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              openCell={() => openCell([columnIndex, cellIndex])}
              isOpen={!cell.isOpen}
            >
              {cell.isMined ? "💣" : cell.minesAround}
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
