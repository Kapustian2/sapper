import { ACTION_TYPE } from "./actionType";

export const setLeaderboardRecord = ({ difficulty, name, time }) => ({
  type: ACTION_TYPE.SET_LEADERBOARD_RECORD,
  payload: { difficulty, name, time },
});
