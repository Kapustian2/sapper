import React from "react";

interface IGameFieldParams {
  fieldW: number;
  fieldH: number;
  mines: number;
}
type Coords = [number, number];

export const useGameField = ({ fieldW, fieldH, mines }: IGameFieldParams) => {
  const field: Array<Array<number>> = [];
  const minesRegister: Coords[] = [];

  for (let i = 0; i < fieldH; i++) {
    field[i] = [];
    for (let j = 0; j < fieldW; j++) {
      field[i][j] = 0;
    }
  }

  while (minesRegister.length < mines) {
    const coord: Coords = [
      Math.floor(Math.random() * fieldH),
      Math.floor(Math.random() * fieldW),
    ];
    if (!minesRegister.find((el) => el[0] === coord[0] && el[1] === coord[1])) {
      minesRegister.push(coord);
    } else continue;
  }

  console.log(minesRegister);

  return { field };
};
