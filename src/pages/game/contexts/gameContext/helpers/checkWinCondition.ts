import { type GameState } from "../reducers/gameReducer";

/**
 * Условия победы выполняется:
 * 1.когда все клетки кроме заминированных открыты
 * 2.таймер не истёк
 */
export const checkWinCondition = (gameState: GameState) => {
  const field = gameState.gameField.field.flat();
  const openCells = field.filter((cell) => !cell.isMined && cell.isOpen).length;

  return openCells === field.length - gameState.gameField.minesCount;
};
