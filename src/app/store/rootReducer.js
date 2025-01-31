import { combineReducers } from "redux";
import gridReducer from "../../entities/Grid/model/gridSlice";
import enemyReducer from "../../features/Enemy/model/enemySlice";
import towerReducer from "../../features/Tower/model/towerSlice";
import playerReducer from "../../entities/Player/model/playerSlice";
import roundReducer from "../../entities/Round/model/roundSlice";
         
export default combineReducers({
  grid: gridReducer,
  enemies: enemyReducer,
  towers: towerReducer,
  player: playerReducer,
  round: roundReducer,
});
