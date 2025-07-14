import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import DashBoard from "../pages/DashBoard";

const dashBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashBoard,
});

export { dashBoardRoute };
