import React from "react";
import styled from "styled-components";
import {
  useGame,
  type CellState,
  openCell,
  cycleCellMark,
  startGame,
} from "../../contexts/gameContext/index.tsx";
import { Cell } from "./components";

interface GameFieldProps {
  className?: string;
}

const GameFieldContainer = (props: GameFieldProps) => {
  const game = useGame();
  if (!game) {
    throw new Error("GameContext недоступен");
  }

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
      {game.state.gameField.field.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          {column.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              onLeftClick={() => {
                if (game.state.gameStatus === "idle")
                  startGame(game.dispatch, [columnIndex, cellIndex]);
                if (game.state.gameStatus !== "end")
                  openCell(game.dispatch, [columnIndex, cellIndex]);
              }}
              onRightClick={() => {
                if (game.state.gameStatus !== "end")
                  cycleCellMark(game.dispatch, [columnIndex, cellIndex]);
              }}
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
