export interface GameState {
  gameField: GameField;
  timer: any;
}

export type Coord = [number, number];
export type CellState = {
  isOpen: boolean;
  mark: null | "flag" | "question";
  isMined: boolean;
  minesAround: number;
};
type GameField = {
  fieldH: number;
  fieldW: number;
  field: Array<Array<CellState>>;
  flagsCounter: number;
};

export type OpenCell = { type: "OPEN_CELL"; payload: { coord: Coord } };
export type CycleCellMark = {
  type: "CYCLE_CELL_MARK";
  payload: { coord: Coord };
};
export type GameAction = OpenCell | CycleCellMark;

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "OPEN_CELL": {
      return {
        ...state,
        gameField: openCell(state.gameField, action.payload.coord),
      };
    }

    case "CYCLE_CELL_MARK": {
      return {
        ...state,
        gameField: cycleMark(state.gameField, action.payload.coord),
      };
    }

    default: {
      throw new Error("Ошибка. Неизвестный action");
    }
  }
}

const openCell = (gameField: GameField, [x, y]: Coord): GameField => {
  const updatedField = [...gameField.field];
  if (updatedField[x][y].mark) return gameField;
  else {
    updatedField[x][y] = {
      ...updatedField[x][y],
      isOpen: true,
    };

    // логика открытия нулей по цепочке
    if (updatedField[x][y].minesAround === 0) {
      const openAdjacentCells = ([x, y]: Coord) => {
        const directions = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        for (const dir of directions) {
          const adjacent: Coord = [x + dir[0], y + dir[1]];
          if (
            adjacent[0] >= 0 &&
            adjacent[0] < gameField.fieldH &&
            adjacent[1] >= 0 &&
            adjacent[1] < gameField.fieldW &&
            !updatedField[adjacent[0]][adjacent[1]].isOpen &&
            !updatedField[adjacent[0]][adjacent[1]].isMined &&
            !updatedField[adjacent[0]][adjacent[1]].mark
          ) {
            updatedField[adjacent[0]][adjacent[1]] = {
              ...updatedField[adjacent[0]][adjacent[1]],
              isOpen: true,
            };
            if (updatedField[adjacent[0]][adjacent[1]].minesAround === 0) {
              openAdjacentCells(adjacent);
            }
          }
        }
      };

      openAdjacentCells([x, y]);
    }
  }
  return { ...gameField, field: updatedField };
};

const cycleMark = (gameField: GameField, [x, y]: Coord): GameField => {
  const updatedField = [...gameField.field];
  const mark = updatedField[x][y].mark;

  let nextMark;
  if (mark === null) {
    nextMark = "flag";
    gameField.flagsCounter = gameField.flagsCounter - 1;
  } else if (mark === "flag") {
    nextMark = "question";
    gameField.flagsCounter = gameField.flagsCounter + 1;
  } else {
    nextMark = null;
  }

  updatedField[x][y] = { ...updatedField[x][y], mark: nextMark };

  return { ...gameField, field: updatedField };
};
