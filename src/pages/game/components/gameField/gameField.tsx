import React from "react";
import styled from "styled-components";
import { Cell, ClosedCell } from "./components/";

const GameFieldContainer = ({ className, count }) => {
  const width = count[0];
  const height = count[1];

  const field = [];

  for (let i = 0; i < height; i++) {
    field[i] = [];
    for (let j = 0; j < width; j++) {
      field[i][j] = 0;
    }
  }

  console.log(field);

  return (
    <div className={className}>
      {field.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          {column.map((cell, cellIndex) => (
            <ClosedCell key={cellIndex} />
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
`;
