import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../model/IUser";

export const localStorageKey = "strava-token";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {} as IUser,
    token: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.currentUser = action.payload.payload;
      state.token = action.payload.payload.access_token;
    },
    logOut: (state) => {
      state.currentUser = {};
      state.token = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const selectCurrentUser: (state: RootState) => IUser = (
  state: RootState
) => {
  return state.user.currentUser;
};
export const selectToken: (state: RootState) => string | null = (
  state: RootState
) => {
  return state.user.token;
};
export default userSlice.reducer;
