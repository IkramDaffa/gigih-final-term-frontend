import Home from "../../module/home";
import VideoDetail from "../../module/videoDetail";
import AddProduct from "../../module/addProduct";
import { createBrowserRouter } from "react-router-dom";
import AddVideo from "../../module/addVideo";

const routerList = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/videoDetail",
    element: <VideoDetail />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
  },
  {
    path: "/addVideo",
    element: <AddVideo />,
  },
]);

export default routerList;
