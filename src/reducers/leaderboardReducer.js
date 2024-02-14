import { ACTION_TYPE } from "../actions/actionType";

// Иницилизация при первой загрузке страницы, при последующий грузит из Localstorage
const initialLeaderboardState = [
  {
    difficulty: "easy",
    name: "Алексей",
    time: 568,
  },
  {
    difficulty: "easy",
    name: "Светлана",
    time: 590,
  },
  {
    difficulty: "easy",
    name: "Иван",
    time: 503,
  },
  {
    difficulty: "easy",
    name: "Екатерина",
    time: 510,
  },
  {
    difficulty: "easy",
    name: "Михаил",
    time: 589,
  },
  {
    difficulty: "easy",
    name: "Ольга",
    time: 502,
  },
  {
    difficulty: "easy",
    name: "Наталья",
    time: 595,
  },
  {
    difficulty: "easy",
    name: "Павел",
    time: 600,
  },
  {
    difficulty: "middle",
    name: "Андрей",
    time: 2399,
  },
  {
    difficulty: "middle",
    name: "Татьяна",
    time: 2400,
  },
  {
    difficulty: "middle",
    name: "Сергей",
    time: 2398,
  },
  {
    difficulty: "middle",
    name: "Елена",
    time: 2400,
  },
  {
    difficulty: "middle",
    name: "Дмитрий",
    time: 2400,
  },
  {
    difficulty: "middle",
    name: "Марина",
    time: 2395,
  },
  {
    difficulty: "middle",
    name: "Алина",
    time: 2380,
  },
  {
    difficulty: "middle",
    name: "Владимир",
    time: 2390,
  },
  {
    difficulty: "hard",
    name: "Григорий",
    time: 6000,
  },
  {
    difficulty: "hard",
    name: "София",
    time: 5987,
  },
  {
    difficulty: "hard",
    name: "Анна",
    time: 5999,
  },
  {
    difficulty: "hard",
    name: "Максим",
    time: 6000,
  },
  {
    difficulty: "hard",
    name: "Егор",
    time: 5995,
  },
  {
    difficulty: "hard",
    name: "Артем",
    time: 6000,
  },
  {
    difficulty: "hard",
    name: "Валентина",
    time: 5980,
  },
  {
    difficulty: "hard",
    name: "Алёна",
    time: 5990,
  },
];

export const leaderboardReducer = (state = initialLeaderboardState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LEADERBOARD_RECORD:
      return [...state, action.payload];

    default:
      return state;
  }
};
