import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  health:30,
  gold:30,
  wood:0,
  income:0
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    getDamage(state,payload){
      state.health-=payload
    },

    
  },
});

export const { moveEnemies, applyDamage, addEnemy } = playerSlice.actions;
export default playerSlice.reducer;
