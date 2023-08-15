import * as actionType from "../actionsType/getVideos";

const initialState = {
  videos: [],
  isLoading: false,
};

function getVideoReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_DATA_VIDEOS:
      return {
        ...state,
        videos: action.data,
      };
    case actionType.SET_STATUS_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
}
export default getVideoReducer;
