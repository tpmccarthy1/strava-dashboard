import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/auth/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
});

export default store;
