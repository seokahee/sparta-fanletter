import { configureStore } from "@reduxjs/toolkit";
import letters from "redux/modules/lettersSlice";
import member from "redux/modules/memberSlice";

const store = configureStore({
  reducer: {
    letters,
    member,
  },
});

export default store;
