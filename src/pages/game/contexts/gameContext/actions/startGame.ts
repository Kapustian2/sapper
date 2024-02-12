import React, { type Dispatch } from "react";
import { type Coord, StartGame } from "../reducers/gameReducer";

export const startGame = (dispatch: Dispatch<StartGame>, coord: Coord) => {
  dispatch({
    type: "START_GAME",
    payload: { coord },
  });
};
