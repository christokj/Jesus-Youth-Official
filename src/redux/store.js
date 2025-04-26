import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import menuItemReducer from "./menuItemSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        menuItem: menuItemReducer,
    },
});

export default store;
