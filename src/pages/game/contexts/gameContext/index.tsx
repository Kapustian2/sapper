import React, {
  createContext,
  useReducer,
  useContext,
  type Dispatch,
  type PropsWithChildren,
  useMemo,
  useEffect,
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
import { checkWinCondition } from "./helpers/checkWinCondition.ts";
import { checkLoseCondition } from "./helpers/checkLoseCondition.ts";
import { onLose } from "./actions/afterLose.ts";
import { onWin } from "./actions/afterWin.ts";
import { setRecord } from "../../../../actions/setRecord.js";
import { useDispatch } from "react-redux";

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
  let dimension, seconds, mines;

  switch (props.gameSettings.difficulty) {
    case "easy":
      dimension = [8, 8];
      seconds = 10 * 60;
      mines = 1;
      break;
    case "middle":
      dimension = [16, 16];
      seconds = 40 * 60;
      mines = 40;
      break;
    case "hard":
      dimension = [32, 16];
      seconds = 100 * 60;
      mines = 77;
      break;
    default:
      break;
  }

  const initialState: GameState = createInitialState(
    dimension[0],
    dimension[1],
    mines,
    seconds
  );
  const [state, dispatch] = useReducer(gameReducer, initialState);

  //Запускает таймер, когда статус игры меняется на playing
  useEffect(() => {
    let intervalId;

    if (state.gameStatus === "playing") {
      intervalId = setInterval(() => {
        dispatch({ type: "TIMER_TICK" });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [state.gameStatus]);
  //Меняет статус игры на end когда таймер заканчивается
  useEffect(() => {
    if (state.timer === 0) state.gameStatus = "end";
  }, [state.timer]);

  //Проверяет выполнения условия победы после каждого изменения поля
  useEffect(() => {
    if (state.gameStatus !== "end")
      if (checkWinCondition(state)) {
        onWin(dispatch);
      }
  }, [state.gameField.field]);

  //Проверяет выполнения условия поражения после каждого изменения поля
  useEffect(() => {
    if (state.gameStatus !== "end")
      if (checkLoseCondition(state)) {
        onLose(dispatch);
      }
  }, [state.gameField.field]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

// заполняет поля минами и считает количество соседних мин

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
    gameField: { fieldH, fieldW, field, minesCount: mines, flags: mines },
    timer: minutes,
    gameStatus: "idle",
    gameResult: undefined,
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
