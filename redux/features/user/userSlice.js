import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: null,
  success: false,
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
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
