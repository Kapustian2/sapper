import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { compose } from "redux";
import { recordReducer } from "./reducers/recordReducer";

const rootReducer = combineReducers({
  record: recordReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Функция сохранения состояния в localStorage
const saveState = (state) => {
  try {
    const arr = JSON.parse(localStorage.getItem("reduxState") ?? "[]");
    arr.push(state);
    localStorage.setItem("reduxState", JSON.stringify(arr));
  } catch (error) {
    console.error("Ошибка сохранения состояния в localStorage:", error);
  }
};

// Функция загрузки состояния из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Ошибка загрузки состояния из localStorage:", error);
    return undefined;
  }
};

// Применяем состояние из localStorage
const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// Подписываемся на изменения состояния Redux
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export { store };
