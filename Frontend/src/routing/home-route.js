import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import Homepage from "../pages/Homepage";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});

export { homeRoute };
