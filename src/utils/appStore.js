import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import moviesReducer from "../utils/moviesSlice"
import gptReducer from "../utils/gptSearchSlice"
import configReducer from "../utils/configSlice"
const appStore = configureStore({
  reducer: {
    user:userReducer,
    movies:moviesReducer,
    gpt:gptReducer,
    config:configReducer
  },
});
export default appStore;
