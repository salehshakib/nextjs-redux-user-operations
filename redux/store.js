import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  // middleware: (getDefaultMiddlewares) =>
  // getDefaultMiddlewares({
  //   serializableCheck: false,
  // }).concat(userApi.middleware),
});

export default store;
