import { configureStore } from "@reduxjs/toolkit";
import letters from "redux/modules/lettersSlice";
import member from "redux/modules/memberSlice";
import auth from "redux/modules/authSlice";

const store = configureStore({
  reducer: {
    letters,
    member,
    auth,
  },
});

export default store;
