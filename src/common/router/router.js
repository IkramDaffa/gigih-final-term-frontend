import RouterList from "./router-list.js";
import { RouterProvider } from "react-router-dom";

function Routers() {
  return (
    <>
      <RouterProvider router={RouterList} />
    </>
  );
}

export default Routers;
