/**
 * Вычисляет время раунда на основе текущего раунда.
 * @param {number} round - Номер текущего раунда .
 * @param {number} totalRounds - Максимальное число раундов.
 * @returns {number} Время раунда в секундах.
 */
export function calculateRoundTime(round,totalRounds) {
  const minTime = 10; // Минимальное время в секундах
  const maxTime = 30; // Максимальное время в секундах

  // Ограничиваем раунд диапазоном от 1 до 12
  const clampedRound = Math.max(1, Math.min(round, totalRounds));

  // Линейная интерполяция времени
  const time = minTime + ((maxTime - minTime) / (totalRounds - 1)) * (clampedRound - 1);

  return Math.round(time);
}

