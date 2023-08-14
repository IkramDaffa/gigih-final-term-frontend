import * as actionType from "../actionsType/getVideoDetail";

const initialState = {
  video: {},
  products: [],
  comments: [],
  isRender: false,
  isRenderForm: false,
};

function getVideoDetailReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_VIDEO:
      return {
        ...state,
        video: action.data,
      };
    case actionType.SET_PRODUCTS:
      return {
        ...state,
        products: action.data,
      };
    case actionType.SET_COMMENTS:
      return {
        ...state,
        comments: action.data,
      };
    case actionType.SET_ISRENDER:
      return {
        ...state,
        isRender: action.data,
      };
    case actionType.SET_ISRENDER_FORM:
      return {
        ...state,
        isRenderForm: action.data,
      };
    default:
      return state;
  }
}

export default getVideoDetailReducer;
