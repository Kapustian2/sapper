import React, {
  createContext,
  useReducer,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  useMemo,
} from "react";
import {
  gameReducer,
  type GameState,
  type CellState,
  type Coord,
  type GameAction,
} from "./reducers/gameReducer.tsx";

const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
} | null>(null);

const GameProvider = (props: PropsWithChildren) => {
  const initialState: GameState = createInitialState(8, 8, 9); // TODO
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

const createInitialState = (
  fieldH: number,
  fieldW: number,
  mines: number
): GameState => {
  const field: Array<Array<CellState>> = [];
  // инициализируем начальными значениями игровое поле

  for (let i = 0; i < fieldH; i++) {
    field[i] = [];
    for (let j = 0; j < fieldW; j++) {
      field[i][j] = {
        isOpen: false,
        mark: null,
        isMined: false,
        minesAround: 0,
      };
    }
  }
  // сохраням координаты мин, чтобы не повторялись
  const minesRegister: Coord[] = [];
  while (minesRegister.length < mines) {
    const coord: Coord = [
      Math.floor(Math.random() * fieldH),
      Math.floor(Math.random() * fieldW),
    ];
    // если координата новая сохраняем в регистре и обновляем состояние клетки
    if (!minesRegister.find((el) => el[0] === coord[0] && el[1] === coord[1])) {
      minesRegister.push(coord);
      field[coord[0]][coord[1]].isMined = true;
    }
  }
  // считаем количество соседних клеток с минами
  for (let i = 0; i < fieldH; i++) {
    for (let j = 0; j < fieldW; j++) {
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
          adjacent[0] < fieldH &&
          adjacent[1] >= 0 &&
          adjacent[1] < fieldW
        ) {
          if (field[adjacent[0]][adjacent[1]].isMined) {
            counter++;
          }
        }
      }
      field[i][j].minesAround = counter;
    }
  }
  return { gameField: { fieldH, fieldW, field }, timer: null };
};
const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame должен быть вызван внутри GameProvider");
  }
  return context;
};

export {
  GameProvider,
  useGame,
  type GameState,
  type CellState,
  type Coord,
  type GameAction,
};
