import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../slices/favourites";

export const store = configureStore({
  reducer: {
    fav: favouritesReducer,
  },
});
