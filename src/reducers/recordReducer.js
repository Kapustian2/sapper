import { ACTION_TYPE } from "../actions/actionType";

const initialRecordState = {
  name: null,
  time: null,
  dif: null,
};

export const recordReducer = (state = initialRecordState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_RECORD:
      return {
        ...state,
        time: action.payload.time,
        name: action.payload.name,
        dif: action.payload.difficulty,
      };

    default:
      return state;
  }
};
