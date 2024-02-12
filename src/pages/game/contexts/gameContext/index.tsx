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
import { cycleCellMark } from "./actions/CycleCellMark.ts";
import { openCell } from "./actions/openCell.ts";
import { startGame } from "./actions/startGame.ts";

const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
} | null>(null);

interface GameProviderProps extends PropsWithChildren {
  gameSettings: {
    difficulty: "easy" | "middle" | "hard" | string;
  };
}

const GameProvider = (props: GameProviderProps) => {
  let dimension, minutes, mines;

  switch (props.gameSettings.difficulty) {
    case "easy":
      dimension = [8, 8];
      minutes = 10;
      mines = 9;
      break;
    case "middle":
      dimension = [16, 16];
      minutes = 40;
      mines = 40;
      break;
    case "hard":
      dimension = [32, 16];
      minutes = 100;
      mines = 77;
      break;
    default:
      break;
  }

  const initialState: GameState = createInitialState(
    dimension[0],
    dimension[1],
    mines,
    minutes
  );
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

// заполняет поля минами и считает количество соседних мин
const setupMines = () => {};

const createInitialState = (
  fieldH: number,
  fieldW: number,
  mines: number,
  minutes: number
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

  return {
    gameField: { fieldH, fieldW, field, minesCount: mines },
    timer: minutes,
    gameStatus: "idle",
  };
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
  cycleCellMark,
  openCell,
  startGame,
};
