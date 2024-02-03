import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./features/user";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
    }).concat(userApi.middleware),
});

export default store;
