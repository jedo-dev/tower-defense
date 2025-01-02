import { createSlice } from "@reduxjs/toolkit";
import { aStarPathfinding } from "../lib/pathfinding";

const initialState = {
  enemies: [
   
  ],
  target: { x: 9, y: 9 },
};

const enemySlice = createSlice({
  name: "enemies",
  initialState,
  reducers: {
    moveEnemies(state, action) {
      const { grid } = action.payload;
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
    addEnemy(state,action){
      state.enemies.push( { id: action.payload.id, x: 0, y: 0, health: 100,totalHealth:100 },)
    },
    applyDamage(state, action) {
      const { towers } = action.payload;
      state.enemies = state.enemies.map((enemy) => {
        const inRange = towers.some((tower) => {
          const dx = Math.abs(tower.x - enemy.x);
          const dy = Math.abs(tower.y - enemy.y);
          return Math.sqrt(dx ** 2 + dy ** 2) <= 1.5; // Радиус атаки
        });
        if (inRange) {
          return { ...enemy, health: Math.max(0, enemy.health - 10) }; // Наносим урон
        }
        return enemy;
      }).filter((enemy) => enemy.health > 0); // Удаляем врагов с нулевым здоровьем
    },
  },
});

export const { moveEnemies, applyDamage, addEnemy } = enemySlice.actions;
export default enemySlice.reducer;
