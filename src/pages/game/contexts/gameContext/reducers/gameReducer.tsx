type GameStatus = "idle" | "playing" | "end";
export interface GameState {
  gameField: GameField;
  gameStatus: GameStatus;
  timer: number;
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
  minesCount: number;
};

export type OpenCell = { type: "OPEN_CELL"; payload: { coord: Coord } };
export type CycleCellMark = {
  type: "CYCLE_CELL_MARK";
  payload: { coord: Coord };
};
export type StartGame = {
  type: "START_GAME";
  payload: { coord: Coord };
};
export type GameAction = OpenCell | CycleCellMark | StartGame;

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

    case "START_GAME": {
      return {
        ...state,
        gameField: startGame(state.gameField, action.payload.coord),
        gameStatus: "playing",
      };
    }

    default: {
      throw new Error("Ошибка. Неизвестный action");
    }
  }
}

const openCell = (gameField: GameField, [x, y]: Coord): GameField => {
  console.log(gameField.field);
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
    gameField.minesCount = gameField.minesCount - 1;
  } else if (mark === "flag") {
    nextMark = "question";
    gameField.minesCount = gameField.minesCount + 1;
  } else {
    nextMark = null;
  }

  updatedField[x][y] = { ...updatedField[x][y], mark: nextMark };

  return { ...gameField, field: updatedField };
};

const startGame = (gameField: GameField, [x, y]: Coord): GameField => {
  const newField = [...gameField.field];
  const minesRegister: Coord[] = [];
  while (minesRegister.length < gameField.minesCount) {
    const coord: Coord = [
      Math.floor(Math.random() * gameField.fieldH),
      Math.floor(Math.random() * gameField.fieldW),
    ];
    // если координата новая сохраняем в регистре и обновляем состояние клетки
    if (
      !minesRegister.find((el) => el[0] === coord[0] && el[1] === coord[1]) &&
      coord[0] !== x &&
      coord[1] !== y
    ) {
      minesRegister.push(coord);
      newField[coord[0]][coord[1]].isMined = true;
    }
  }
  // считаем количество соседних клеток с минами
  for (let i = 0; i < gameField.fieldH; i++) {
    for (let j = 0; j < gameField.fieldW; j++) {
      let counter = 0;
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
        const adjacent: Coord = [i + dir[0], j + dir[1]];
        if (
          adjacent[0] >= 0 &&
          adjacent[0] < gameField.fieldH &&
          adjacent[1] >= 0 &&
          adjacent[1] < gameField.fieldW
        ) {
          if (newField[adjacent[0]][adjacent[1]].isMined) {
            counter++;
          }
        }
      }
      newField[i][j].minesAround = counter;
    }
  }

  return { ...gameField, field: newField };
};
