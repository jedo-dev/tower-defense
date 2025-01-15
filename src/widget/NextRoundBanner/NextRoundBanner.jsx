import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateRoundTime } from "../../utils/calculateRoundTime";
import { setTime, startRound } from "../../entities/Round/model/roundSlice";
import { uid } from "uid";
import { addEnemy } from "../../features/Enemy/model/enemySlice";
export const NextRoundBanner = () => {
  const dispatch = useDispatch();
  const { wave, totalwave, time, roundStart } = useSelector((state) => state.round);

  useEffect(() => {
    if (!roundStart) {
      const timerDuration = calculateRoundTime(wave, totalwave); // Рассчитываем длительность времени
      dispatch(setTime(timerDuration));
      console.log(`use effect NextRoundBanner`)
    }
  }, [wave, roundStart, dispatch]);

  useEffect(() => {
    let timer = null;
    if (!roundStart && time > 0) {
      timer = setInterval(() => {
        dispatch(setTime(time - 1));
      }, 1000);
    }

    if (time === 0) {
      clearInterval(timer);
       dispatch(addEnemy({id:uid(),health:100}))
      dispatch(startRound()); // Начинаем раунд
    }
    console.log(`use effect NextRoundBanner start will`)
    return () => clearInterval(timer);
  }, [time, roundStart, dispatch]);

  return (
    <div className="nextround-banner-wrapper">
      <div>Next round will start in</div>
      <div>00:{time < 10 ? `0${time}` : time}</div>
    </div>
  );
};
