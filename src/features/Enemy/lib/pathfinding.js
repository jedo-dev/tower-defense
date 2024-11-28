export const aStarPathfinding = (start, end, grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  // Эвристическая функция
  const heuristic = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2); // Евклидово расстояние

  // Открытый список с начальной точкой
  const openSet = [{ ...start, g: 0, f: heuristic(start.x, start.y, end.x, end.y) }];
  const cameFrom = {};
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  gScore[start.y][start.x] = 0;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f); // Сортируем по f
    const current = openSet.shift();

    if (current.x === end.x && current.y === end.y) {
      // Восстановление пути
      const path = [];
      let temp = current;
      while (temp) {
        path.push({ x: temp.x, y: temp.y });
        temp = cameFrom[`${temp.x},${temp.y}`];
      }
      return path.reverse();
    }

    // Восемь направлений (включая диагональные)
    const neighbors = [
      { x: current.x - 1, y: current.y }, // Влево
      { x: current.x + 1, y: current.y }, // Вправо
      { x: current.x, y: current.y - 1 }, // Вверх
      { x: current.x, y: current.y + 1 }, // Вниз
      { x: current.x - 1, y: current.y - 1 }, // Диагональ влево вверх
      { x: current.x + 1, y: current.y - 1 }, // Диагональ вправо вверх
      { x: current.x - 1, y: current.y + 1 }, // Диагональ влево вниз
      { x: current.x + 1, y: current.y + 1 }, // Диагональ вправо вниз
    ];

    neighbors.forEach((neighbor) => {
      if (
        neighbor.x >= 0 &&
        neighbor.x < cols &&
        neighbor.y >= 0 &&
        neighbor.y < rows &&
        grid[neighbor.y][neighbor.x] !== 1 // Учитываем препятствия (башни)
      ) {
        const tentativeG = gScore[current.y][current.x] + (neighbor.x !== current.x && neighbor.y !== current.y ? 1.414 : 1); // Учитываем диагональное движение

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

  return []; // Если пути нет
};
