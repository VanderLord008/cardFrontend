import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

//creating a redux store
const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
