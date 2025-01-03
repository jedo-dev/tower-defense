import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../../entities/Grid/ui/Grid";
import { moveEnemies, applyDamage } from "../../features/Enemy/model/enemySlice";
import { placeTower } from "../../entities/Grid/model/gridSlice";
import  '../../index.css'
import { TowerSelection } from "../../widget/TowerSelection/TowerSelection";
const GamePage = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);
  const enemies = useSelector((state) => state.enemies.enemies);
  const [draggedTower, setDraggedTower] = useState(null);

  const handleTowerDragStart = (towerType) => {
    setDraggedTower(towerType);
  };
  const handleCellClick = (row, col) => {
    dispatch(placeTower({ x: col, y: row }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(moveEnemies({ grid }));
      dispatch(applyDamage({ towers: getTowerPositions(grid) }));
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, grid]);

  const getTowerPositions = (grid) =>
    grid.reduce((acc, row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) acc.push({ x, y });
      });
      return acc;
    }, []);

  return (
    <>
      <div className="enemy-spawn"></div>
      <Grid onCellClick={handleCellClick} enemies={enemies} />
      <TowerSelection onTowerDragStart={handleTowerDragStart} /> 
      <div>
        
      </div>
    </>
  );
};

export default GamePage;
