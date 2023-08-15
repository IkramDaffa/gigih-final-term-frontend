import { API } from "../../API";
import * as actionType from "../actionsType/getVideos";

export const actionSetDataVideos = (data) => ({
  type: actionType.SET_DATA_VIDEOS,
  data,
});
export const actionSetIsLoading = (data) => ({
  type: actionType.SET_STATUS_LOADING,
  data,
});

export const getDataVideos = () => async (dispatch) => {
  API.get("video/getVideos")
    .then((res) => {
      dispatch(actionSetDataVideos(res.data.videos));
      dispatch(actionSetIsLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(actionSetIsLoading(false));
    });
};
