import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  towers: [],
};

const towerSlice = createSlice({
  name: "towers",
  initialState,
  reducers: {
    addTower(state, action) {
      state.towers.push(action.payload);
    },
  },
});

export const { addTower } = towerSlice.actions;
export default towerSlice.reducer;
