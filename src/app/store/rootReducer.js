import { combineReducers } from "redux";
import gridReducer from "../../entities/Grid/model/gridSlice";
import enemyReducer from "../../features/Enemy/model/enemySlice";
import towerReducer from "../../features/Tower/model/towerSlice";

export default combineReducers({
  grid: gridReducer,
  enemies: enemyReducer,
  towers: towerReducer,
});
