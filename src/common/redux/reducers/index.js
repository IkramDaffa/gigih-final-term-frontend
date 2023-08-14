import { combineReducers } from "redux";
import getVideos from "./getVideos";
import getVideoDetail from "./getVideoDetail";

export default combineReducers({
  getVideos,
  getVideoDetail,
});
