import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: null,
  success: false,
  singleUserId: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.success = true;
    },
    setUserDetails: (state, { payload }) => {
      state.singleUserId = payload;
    },
    removeUserId: (state, { payload }) => {
      state.singleUserId = undefined;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
