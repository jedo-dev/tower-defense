import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../../entities/Grid/ui/Grid";
import { moveEnemies, applyDamage,addEnemy } from "../../features/Enemy/model/enemySlice";
import { placeTower } from "../../entities/Grid/model/gridSlice";
import  '../../index.css'
import { TowerSelection } from "../../widget/TowerSelection/TowerSelection";
import { uid } from "uid";
import { NextRoundBanner } from "../../widget/NextRoundBanner/NextRoundBanner";
import { endRound } from "../../entities/Round/model/roundSlice";
const GamePage = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);
  const {roundStart} = useSelector((state) => state.round);
  const enemies = useSelector((state) => state.enemies.enemies);
  
  const [draggedTower, setDraggedTower] = useState(null);

  const handleTowerDragStart = (towerType) => {
    console.log(towerType);
  };
  const handleCellClick = (row, col) => {
    dispatch(placeTower({ x: col, y: row }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(moveEnemies({ grid }));
      dispatch(applyDamage({ towers: getTowerPositions(grid) }));
      // dispatch(addEnemy({id:uid()}))
    }, 1000);
      console.log(`index js `, enemies ,roundStart)
    if(enemies.length === 0 && roundStart){
      dispatch(endRound())
    }
    return () => clearInterval(interval);
  }, [ grid]);

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
      <NextRoundBanner/>
      <div>
        
      </div>
    </>
  );
};

export default GamePage;
