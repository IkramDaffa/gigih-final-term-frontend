import * as actionType from "../actionsType/getVideos";

const initialState = {
  videos: [],
};

function getVideoReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_DATA_VIDEOS:
      return {
        ...state,
        videos: action.data,
      };
    default:
      return state;
  }
}
export default getVideoReducer;
