import { createSlice } from "@reduxjs/toolkit";
import { aStarPathfinding } from "../lib/pathfinding";

const initialState = {
  enemies: [
    { id: 1, x: 0, y: 0, health: 100 },
  ],
  target: { x: 9, y: 9 },
};

const enemySlice = createSlice({
  name: "enemies",
  initialState,
  reducers: {
    moveEnemies(state, action) {
      const { grid } = action.payload; // Передаем актуальную сетку
      state.enemies = state.enemies.map((enemy) => {
        const path = aStarPathfinding(
          { x: enemy.x, y: enemy.y },
          state.target,
          grid
        );
        if (path.length > 1) {
          return { ...enemy, x: path[1].x, y: path[1].y };
        }
        return enemy;
      });
    },
  },
});

export const { moveEnemies } = enemySlice.actions;
export default enemySlice.reducer;
