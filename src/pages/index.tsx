import { createHashRouter } from "react-router-dom";
import Home from "./Home";
import Binder from "../components/Binder";
import ProtectedRoute from "../hooks/ProtectedRoute";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/binder/:jobsId",
    element: (
      <ProtectedRoute>
        <Binder />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <div>404 | Page not found</div>,
  },
]);

export default router;
