import React from "react";
import styled from "styled-components";
import { useGame, type CellState } from "../../contexts/gameContext/index.tsx";
import { Cell } from "./components";

interface GameFieldProps {
  className?: string;
  dimension: [number, number];
  mines: number;
}

const GameFieldContainer = (props: GameFieldProps) => {
  const game = useGame();

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
      {game?.state.gameField.field.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          {column.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              onLeftClick={() =>
                game.dispatch({
                  type: "OPEN_CELL",
                  payload: { coord: [columnIndex, cellIndex] },
                })
              }
              onRightClick={() =>
                game.dispatch({
                  type: "CYCLE_CELL_MARK",
                  payload: { coord: [columnIndex, cellIndex] },
                })
              }
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
