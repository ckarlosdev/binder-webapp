import { createHashRouter } from "react-router-dom";
import Home from "./Home";
import Binder from "../components/Binder";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/binder/:jobsId", element: <Binder /> },
  {
    path: "*",
    element: <div>404 | Page not found</div>,
  },
]);

export default router;
