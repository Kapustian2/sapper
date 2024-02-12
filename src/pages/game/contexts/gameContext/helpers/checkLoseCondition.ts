import { type GameState } from "../reducers/gameReducer";

/**
 * Условия поражения выполняется:
 * 1.когда была открыта мина
 * 2.таймер истёк
 */
export const checkLoseCondition = (gameState: GameState) => {
  const field = gameState.gameField.field.flat();
  const openCell = field.find((cell) => cell.isMined && cell.isOpen);

  return openCell;
};
