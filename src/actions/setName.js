import { ACTION_TYPE } from "./actionType";

export const setName = (name) => ({
  type: ACTION_TYPE.SET_NAME,
  payload: name,
});
