import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menu",
    initialState: { selectedMenu: "DRINKS" },
    reducers: {
        setMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
    },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
