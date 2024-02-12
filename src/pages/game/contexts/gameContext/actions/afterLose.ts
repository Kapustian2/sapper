import React, { type Dispatch } from "react";
import { type Coord, OnLose } from "../reducers/gameReducer";

export const onLose = (dispatch: Dispatch<OnLose>) => {
  dispatch({
    type: "ON_LOSE",
  });
};
