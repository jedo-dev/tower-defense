import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: 1,
  gold: 30,
  wave: 1,
  totalwave: 12,
  time: 30,
  roundStart: false, // Запущен ли раунд
};

const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    startRound(state) {
      state.roundStart = true;
    },
    endRound(state) {
      state.roundStart = false;
      state.wave += 1; // Переход к следующей волне
    },
    setTime(state, action) {
      state.time = action.payload;
    },
  },
});

export const { startRound, endRound, setTime } = roundSlice.actions;
export default roundSlice.reducer;
