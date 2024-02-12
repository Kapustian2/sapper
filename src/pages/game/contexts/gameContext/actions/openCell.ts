import React, { type Dispatch } from "react";
import { type Coord, OpenCell } from "../reducers/gameReducer";

export const openCell = (dispatch: Dispatch<OpenCell>, coord: Coord) => {
  dispatch({
    type: "OPEN_CELL",
    payload: { coord },
  });
};
