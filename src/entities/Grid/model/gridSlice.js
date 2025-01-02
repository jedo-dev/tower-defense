import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grid: Array.from({ length: 10 }, () => Array(10).fill(0)),
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGrid(state, action) {
      state.grid = action.payload;
    },
    placeTower(state, action) {
      const { x, y } = action.payload;
      state.grid[y][x] = 1; // Помечаем клетку как занятую башней
    },
  },
});

export const { setGrid, placeTower } = gridSlice.actions;
export default gridSlice.reducer;
