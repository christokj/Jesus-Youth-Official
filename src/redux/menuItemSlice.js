import { createSlice } from "@reduxjs/toolkit";

const menuItemSlice = createSlice({
    name: "menuItem",
    initialState: { items: [] },
    reducers: {
        addMenuItem: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

export const { addMenuItem } = menuItemSlice.actions;
export default menuItemSlice.reducer;
