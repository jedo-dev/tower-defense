import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../../entities/Grid/ui/Grid";
import { moveEnemies } from "../../features/Enemy/model/enemySlice";
import { placeTower } from "../../entities/Grid/model/gridSlice";

const GamePage = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);
  const enemies = useSelector((state) => state.enemies.enemies);

  const handleCellClick = (row, col) => {
    dispatch(placeTower({ x: col, y: row }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(moveEnemies({ grid }));
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch, grid]);

  return (
    <div>
      <h1>Tower Defense Game</h1>
      <Grid onCellClick={handleCellClick} enemies={enemies} />
    </div>
  );
};

export default GamePage;
