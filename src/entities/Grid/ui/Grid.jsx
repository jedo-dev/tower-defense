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
                  backgroundColor: cell === 1 ? "gray" : "white", // Башни
                  position: "relative",
                }}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {enemy && (
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {enemy.health}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
