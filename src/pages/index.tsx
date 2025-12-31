import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Binder from "../components/Binder";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/binder/:jobsId", element: <Binder /> },
  {
    path: "*",
    element: <div>404 | Página no encontrada</div>,
  },
]);

export default router;
