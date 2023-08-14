import { API } from "../../API";
import * as actionType from "../actionsType/getVideoDetail";

export const actionSetVideoDetail = (data) => ({
  type: actionType.SET_VIDEO,
  data,
});
export const actionSetProduct = (data) => ({
  type: actionType.SET_PRODUCTS,
  data,
});
export const actionSetComments = (data) => ({
  type: actionType.SET_COMMENTS,
  data,
});
export const actionSetIsRender = (data) => ({
  type: actionType.SET_ISRENDER,
  data,
});
export const actionSetIsRenderForm = (data) => ({
  type: actionType.SET_ISRENDER_FORM,
  data,
});

export const fetchVideoDetail = (id) => async (dispatch) => {
  API.get(id)
    .then((res) => {
      dispatch(actionSetVideoDetail(res.data[0]));
      dispatch(actionSetProduct(res.data[0].products));
      dispatch(actionSetComments(res.data[0].comments));
    })
    .catch((err) => console.log(err));
};
