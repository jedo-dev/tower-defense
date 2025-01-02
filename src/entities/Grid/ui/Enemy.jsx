import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CELL_SIZE = 64; // Размер клетки

export const Enemy = ({ x, y, health, totalHealth }) => {
  
  const enemyRef = useRef();

  const prevPosition = useRef({ x: 0, y: 0 }); // Хранение предыдущих координат

  useEffect(() => {
    let targetX
    let targetY
    // Рассчитать новую позицию в пикселях
    if(prevPosition.current.x!== x) {
        targetX = x + CELL_SIZE;
    }
    else{
      targetX=x
    }
    if(prevPosition.current.y!== y) {
      targetY = y + CELL_SIZE;
    }
    else{
      targetY=y
    }
  console.log(`zalupa`,x,y,"ff", targetX,targetY)
    // Анимировать движение врага от предыдущей позиции к новой
    gsap.to(enemyRef.current, {
      x: targetX,
      y: targetY,
      duration: 1.1,
      ease: "none",
    });

    // Обновить сохраненные координаты
    prevPosition.current = { x, y };
  }, [x, y]); // Срабатывает при изменении x или y


  return (
    <div
      ref={enemyRef}
      className="spritesheet-icon"
     
    >
      {/* Полоса здоровья */}
      <progress
        className="progressplayer"
        value={health}
        max={totalHealth}
        style={{ position: "absolute", top: "-10px", width: "100%" }}
      ></progress>
    </div>
  );
};
