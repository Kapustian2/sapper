import React, { useMemo, useState } from "react";

interface IGameFieldParams {
  fieldW: number;
  fieldH: number;
  mines: number;
}
type Coord = [number, number];

export type CellState = {
  isOpen: boolean;
  mark: null | "flag" | "question";
  isMined: boolean;
  minesAround: number;
};

export const useGameField = ({ fieldW, fieldH, mines }: IGameFieldParams) => {
  const [field, setField] = useState<Array<Array<CellState>>>(() => {
    const newField: Array<Array<CellState>> = [];
    // инициализируем начальными значениями игровое поле
    for (let i = 0; i < fieldH; i++) {
      newField[i] = [];
      for (let j = 0; j < fieldW; j++) {
        newField[i][j] = {
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
      if (
        !minesRegister.find((el) => el[0] === coord[0] && el[1] === coord[1])
      ) {
        minesRegister.push(coord);
        newField[coord[0]][coord[1]].isMined = true;
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
            if (newField[adjacent[0]][adjacent[1]].isMined) {
              counter++;
            }
          }
        }
        newField[i][j].minesAround = counter;
      }
    }
    console.log(newField);
    return newField;
  });

  const openCell = ([x, y]: Coord) => {
    const updatedField = [...field];
    if (updatedField[x][y].mark) return;
    else {
      updatedField[x][y] = {
        ...updatedField[x][y],
        isOpen: true,
      };
      console.log("openCell");
      setField(updatedField);
    }
  };

  const cycleMark = ([x, y]: Coord) => {
    const updatedField = [...field];
    const mark = updatedField[x][y].mark;
    const nextMark =
      mark === null ? "flag" : mark === "flag" ? "question" : null;
    updatedField[x][y] = {
      ...updatedField[x][y],
      mark: nextMark,
    };
    console.log("cycleMark");
    setField(updatedField);
  };

  return { field, openCell, cycleMark };
};
