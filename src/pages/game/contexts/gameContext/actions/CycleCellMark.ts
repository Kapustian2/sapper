import React, { type Dispatch } from "react";
import { type Coord, CycleCellMark } from "../reducers/gameReducer";

export const cycleCellMark = (
  dispatch: Dispatch<CycleCellMark>,
  coord: Coord
) => {
  dispatch({
    type: "CYCLE_CELL_MARK",
    payload: { coord },
  });
};
