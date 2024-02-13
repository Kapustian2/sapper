import { ACTION_TYPE } from "../actions/actionType";

const initialLeaderboardState = [];

export const leaderboardReducer = (state = initialLeaderboardState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LEADERBOARD_RECORD:
      return [...state, action.payload];

    default:
      return state;
  }
};
