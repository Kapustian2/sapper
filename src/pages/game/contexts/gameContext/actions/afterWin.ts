import React, { type Dispatch } from "react";
import { type Coord, OnWin } from "../reducers/gameReducer";

export const onWin = (dispatch: Dispatch<OnWin>) => {
  dispatch({
    type: "ON_WIN",
  });
};
