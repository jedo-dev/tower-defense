import React from "react";
import { useSelector } from "react-redux";

export const Grid = ({ onCellClick, enemies }) => {
  const grid = useSelector((state) => state.grid.grid);

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div style={{ display: "flex" }} key={rowIndex}>
          {row.map((cell, colIndex) => {
            const enemy = enemies.find((e) => e.x === colIndex && e.y === rowIndex);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: 30,
                  height: 30,
                  border: "1px solid black",
                  backgroundColor: enemy
                    ? "red" // Враг
                    : cell === 1
                    ? "gray" // Башня
                    : "white", // Пустая клетка
                }}
                onClick={() => onCellClick(rowIndex, colIndex)}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
