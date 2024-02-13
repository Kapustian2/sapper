import { ACTION_TYPE } from "./actionType";

export const setRecord = (difficulty, time, name) => ({
  type: ACTION_TYPE.SET_RECORD,
  payload: { difficulty, name, time },
});
