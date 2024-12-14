import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/src/data/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null as User | null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = {
        ...state.userInfo,
        ...(action.payload as User),
      };
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
