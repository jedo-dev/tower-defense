import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tower from "../../../assets/tower-1.png"; // Импорт изображения
import { placeTower } from "../model/gridSlice";
import { Enemy } from "./Enemy";

const CELL_SIZE = 64; // Размер клетки

export const Grid = ({ onCellClick, enemies }) => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);

  const handleDrop = (event, rowIndex, colIndex) => {
    event.preventDefault();
    const towerType = event.dataTransfer.getData("towerType"); // Получаем тип башни
    if (towerType && grid[rowIndex][colIndex] === 0) {
      dispatch(placeTower({ x: colIndex, y: rowIndex, towerType })); // Обновляем Redux
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault(); // Разрешаем перетаскивание
  };
  return (
    <div className='grid-background' style={{ position: "relative", width: `${grid[0].length * CELL_SIZE}px`, height: `${grid.length * CELL_SIZE}px` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const enemy = enemies.find((e) => e.x === colIndex && e.y === rowIndex);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                position: "absolute",
                left: `${colIndex * CELL_SIZE}px`,
                top: `${rowIndex * CELL_SIZE}px`,
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundSize: "contain",
           
                backgroundImage:cell === 1 ?`url(${tower})` : null,
                backgroundRepeat: "no-repeat",
                backgroundPosition:'center',
                border: "1px solid #12090942",
              }}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {enemy && (
          
              <Enemy
          key={enemy.id}
          x={enemy.x}
          y={enemy.y}
          health={enemy.health}
          totalHealth={enemy.totalHealth}
        />
          
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
