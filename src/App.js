import React, { useState, useEffect } from "react";

const initialGrid = Array.from({ length: 10 }, () => Array(10).fill(0)); // 10x10 поле

const initialEnemies = [
  { id: 1, x: 0, y: 0, health: 100 },
];

const target = { x: 9, y: 9 }; // Цель (финиш)

function App() {
  const [grid, setGrid] = useState(initialGrid);
  const [enemies, setEnemies] = useState(initialEnemies);
  const [towers, setTowers] = useState([]); // Хранение позиций башен

  const placeTower = (x, y) => {
    // Проверяем, что башня не ставится поверх врага
    if (grid[x][y] === 2) return;

    setTowers((prevTowers) => [...prevTowers, { x, y }]); // Добавляем башню
  };

  // Функция для реализации A*
  const aStarPathfinding = (start, end) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const heuristic = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2); // Манхэттенская дистанция

    const openSet = [{ ...start, g: 0, f: heuristic(start.x, start.y, end.x, end.y) }];
    const cameFrom = {};
    const gScore = Array.from({ length: rows }, () =>
      Array(cols).fill(Infinity)
    );
    gScore[start.y][start.x] = 0;

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f); // Сортируем по f
      const current = openSet.shift();

      if (current.x === end.x && current.y === end.y) {
        // Если достигли цели, восстанавливаем путь
        const path = [];
        let temp = current;
        while (temp) {
          path.push({ x: temp.x, y: temp.y });
          temp = cameFrom[`${temp.x},${temp.y}`];
        }
        return path.reverse(); // Путь от старта до конца
      }

      const neighbors = [
        { x: current.x - 1, y: current.y }, // Лево
        { x: current.x + 1, y: current.y }, // Право
        { x: current.x, y: current.y - 1 }, // Верх
        { x: current.x, y: current.y + 1 }, // Низ
      ];

      neighbors.forEach((neighbor) => {
        if (
          neighbor.x >= 0 &&
          neighbor.x < cols &&
          neighbor.y >= 0 &&
          neighbor.y < rows &&
          grid[neighbor.y][neighbor.x] !== 1 // Проверяем, что это не башня
        ) {
          const tentativeG = gScore[current.y][current.x] + 1;

          if (tentativeG < gScore[neighbor.y][neighbor.x]) {
            cameFrom[`${neighbor.x},${neighbor.y}`] = current;
            gScore[neighbor.y][neighbor.x] = tentativeG;
            const f = tentativeG + heuristic(neighbor.x, neighbor.y, end.x, end.y);
            if (!openSet.some((node) => node.x === neighbor.x && node.y === neighbor.y)) {
              openSet.push({ ...neighbor, g: tentativeG, f });
            }
          }
        }
      });
    }
    return []; // Если путь не найден
  };

  const moveEnemies = () => {
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        const path = aStarPathfinding({ x: enemy.x, y: enemy.y }, target);
        if (path.length > 1) {
          // Двигаем врага на следующий шаг
          return { ...enemy, x: path[1].x, y: path[1].y };
        }
        return enemy; // Если враг уже на цели, не двигается
      })
    );
  };

 

  useEffect(() => {
    const newGrid = initialGrid.map((row) => [...row]);

    // Добавляем башни на сетку
    towers.forEach((tower) => {
      newGrid[tower.x][tower.y] = 1;
    });

    // Добавляем врагов на сетку
    enemies.forEach((enemy) => {
      if (enemy.x >= 0 && enemy.x < 10 && enemy.y >= 0 && enemy.y < 10) {
        newGrid[enemy.y][enemy.x] = 2;
      }
    });

    setGrid(newGrid);
  }, [enemies, towers]);

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div style={{ display: "flex" }} key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: 30,
                height: 30,
                border: "1px solid black",
                backgroundColor:
                  cell === 1
                    ? "gray" // Башня
                    : cell === 2
                    ? "red" // Враг
                    : "white", // Пустая клетка
              }}
              onClick={() => placeTower(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
