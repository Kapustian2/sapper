import { type GameState } from "../reducers/gameReducer";

/**
 * Условия победы выполняется:
 * 1.когда все клетки кроме заминированных открыты
 * 2.таймер не истёк
 */
export const checkWinCondition = (gameState: GameState) => {
  const field = gameState.gameField.field.flat();
  const openCells = field.filter((cell) => !cell.isMined && cell.isOpen).length;
  const markCells = field.filter((cell) => cell.isMined && cell.mark).length;

  return (
    openCells === field.length - gameState.gameField.minesCount ||
    markCells === field.length - gameState.gameField.minesCount
  );
};
